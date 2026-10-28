import SkillChip from "@/components/ui/SkillChip";
import { stack } from "@/data/stack";

export default function StackList() {
  return (
    <dl className="m-0 mt-5 grid gap-2">
      {stack.map((group) => (
        // Label above chips at every width so each group gets the full measure and stays on one line
        <div key={group.label} className="grid gap-2.5">
          <dt className="meta">{group.label}</dt>
          <dd className="m-0">
            <ul role="list" className="m-0 flex list-none flex-wrap gap-2 p-0">
              {group.items.map((item) => (
                <li key={item.name}>
                  <SkillChip {...item} />
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
