import { Card } from "@/components/ui/card";
import { Experience } from "@/content/experience";
import { Briefcase } from "lucide-react";
import { TagPill } from "./ui/tag-pill";

export default function ExperienceCard({
  company,
  position,
  description,
  startDate,
  endDate,
  tags,
}: Experience) {
  return (
    <Card className="p-6 bg-card border-card-border min-h-36">
      <div className="flex flex-col justify-between h-full gap-12">
        <div className="flex flex-row gap-3">
          <Briefcase className="h-5 w-5 text-purple-blue" />
          <div className="w-full">
            <div className="flex md:flex-row justify-between flex-col">
              <h3 className="text-lg font-semibold text-purple-blue">
                {company}: {position}
              </h3>
              <p className="text-sm text-gray-white">
                {startDate} - {endDate}
              </p>
            </div>
            <div className="text-gray-white leading-relaxed">
              {Array.isArray(description) ? (
                <ul className="list-disc pl-5 text-sm space-y-2 md:max-w-3/4">
                  {description.map((bullet, idx) => (
                    <li key={idx} className="text-wrap-pretty">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-wrap-pretty md:max-w-3/4">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="space-x-6">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 font-mono">
              {tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
