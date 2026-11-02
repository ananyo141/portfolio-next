import Image from "next/image";

const ALT = "Portrait of Ananyobrata Pal";

export default function Portrait({ variant }: { variant: "hero" | "avatar" }) {
  const hero = variant === "hero";
  const base = "photo absolute left-1/2 block h-auto -translate-x-1/2";
  const sizes = hero ? "(max-width: 768px) 80vw, 360px" : "68px";
  return (
    <span role="img" aria-label={ALT} className="absolute inset-0">
      <Image
        src="/headshot-dark.png"
        alt=""
        width={1307}
        height={1203}
        priority={hero}
        sizes={sizes}
        className={`${base} photo-dark`}
        style={{ bottom: hero ? 0 : -2, width: hero ? "120%" : "130%" }}
      />
      <Image
        src="/headshot-light.png"
        alt=""
        width={1268}
        height={1240}
        priority={hero}
        sizes={sizes}
        className={`${base} photo-light`}
        style={{ bottom: hero ? 0 : -2, width: hero ? "114%" : "124%" }}
      />
    </span>
  );
}
