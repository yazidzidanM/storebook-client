import * as s from "./styles"

export function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h2 className={s.sectionTitle}>{title}</h2>
      <p className={s.sectionDesc}>{desc}</p>
    </div>
  );
}
