import Image from "next/image";
import style from "./LeafAnimator.module.css";

export default function LeafAnimator() {
  return (
    <div className={style.x}>
      <Image
        src="/leaf-bg-2.png"
        width={94}
        height={150}
        alt="leaf"
        className={style.y}
      />
    </div>
  );
}
