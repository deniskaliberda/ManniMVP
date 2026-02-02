import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./lib/sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Manni's Fahrschule",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Manni's Fahrschule CMS")
          .items([
            S.listItem()
              .title("Theorie-Blockwochen")
              .icon(() => "📅")
              .child(
                S.documentTypeList("theoryTerm")
                  .title("Theorie-Blockwochen")
                  .defaultOrdering([{ field: "startDate", direction: "desc" }])
              ),
            S.listItem()
              .title("Preise & Führerscheinklassen")
              .icon(() => "💰")
              .child(
                S.documentTypeList("pricing")
                  .title("Preise & Führerscheinklassen")
                  .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !["theoryTerm", "pricing"].includes(
                  listItem.getId() as string
                )
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
