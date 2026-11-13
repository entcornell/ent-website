#!/usr/bin/env node
// Shrinks a 3D model in public/models for the web: merges duplicate vertices and simplifies
// the mesh, keeping names and transforms so components keep loading the same path.
//
//   node scripts/optimize-model.mjs public/models/rocket.glb [ratio]
//
// `ratio` is the share of triangles to keep (default 0.05); the model is overwritten, the
// original stays in git history or wherever it came from.
import { statSync } from "node:fs";
import { NodeIO, PropertyType } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { dedup, prune, simplify, weld } from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";

const [file, ratioArg] = process.argv.slice(2);
if (!file) {
  console.error("Usage: node scripts/optimize-model.mjs <model.glb> [ratio]");
  process.exit(1);
}
const ratio = Number(ratioArg ?? 0.05);

await MeshoptSimplifier.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const before = statSync(file).size;
const doc = await io.read(file);
await doc.transform(
  // Only geometry is deduplicated: merging materials would drop names that components
  // look up (the rocket's smoke animates "white.Smoke" by name).
  dedup({ propertyTypes: [PropertyType.ACCESSOR, PropertyType.MESH] }),
  weld(),
  simplify({ simplifier: MeshoptSimplifier, ratio, error: 0.004 }),
  prune({ propertyTypes: [PropertyType.ACCESSOR, PropertyType.BUFFER] }),
  // No quantize() or meshopt(): both move the geometry's scale onto node transforms (meshopt
  // quantizes first), and components written with gltfjsx read the geometry alone and
  // apply their own transforms. Simplifying is what saves the weight anyway.
);
await io.write(file, doc);
const after = statSync(file).size;
console.warn(`${file}: ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(2)} MB`);
