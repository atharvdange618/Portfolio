import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <>
      <div className="space-y-3" id="#about">
        <h2 className="text-gray-white text-2xl font-semibold tracking-tight">
          About
        </h2>
        <Card className="p-6 bg-card border-card-border">
          <h3 className="mb-3 font-semibold text-purple-blue font-mono">
            $ cat about.txt
          </h3>
          <div className="text-gray-white">
            <ul className="flex flex-col ml-5">
              <li>👾 Open to opportunities!</li>
              <li>🐝 Interests in web, mobile &amp; systems</li>
              <li>👩‍💻 Based in Pune, India</li>
            </ul>
          </div>
        </Card>
      </div>
    </>
  );
}
