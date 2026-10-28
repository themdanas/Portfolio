import { siteConfig } from "@/data/site";

const groups = [
  { label: "AI / ML", items: siteConfig.skills.aiMl },
  { label: "LLM systems", items: siteConfig.skills.llmEngineering },
  { label: "Languages", items: siteConfig.skills.languages },
  { label: "Infra", items: siteConfig.skills.backendInfra },
];

export default function StackList() {
  return (
    <dl className="spec">
      {groups.map((group) => (
        <div key={group.label}>
          <dt>{group.label}</dt>
          <dd>{group.items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}
