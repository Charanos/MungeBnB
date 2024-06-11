"use client";

interface HeadingProps {
  title: string;
  center?: boolean;
  subtitle?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, center, subtitle }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold font-secondaryFont uppercase">
        {title}
      </div>

      <div className="font-light text-accentColor2 mt-2 capitalize">
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
