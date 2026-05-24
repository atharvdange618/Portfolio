import { Card } from "@/components/ui/card";
import { Project } from "@/content/projects";
import { Folder, ExternalLink } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { TagPill } from "./ui/tag-pill";

export default function ProjectCard({
  title,
  description,
  tags,
  liveLink,
  devLink,
}: Project) {
  return (
    <Card className="p-6 bg-card border-card-border min-h-52">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-row gap-3">
          <Folder className="flex-none w-5 h-5 text-purple-blue" />
          <div>
            <h3 className="text-lg font-semibold text-purple-blue">{title}</h3>
            <div className="mt-3 text-gray-white leading-relaxed">
              {Array.isArray(description) ? (
                <ul className="list-disc pl-5 text-sm space-y-2">
                  {description.map((bullet, idx) => (
                    <li key={idx} className="text-wrap-pretty">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-wrap-pretty">{description}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
            <div className="flex flex-row-reverse gap-6">
              {liveLink && (
                <Link href={liveLink} onClick={(e) => e.stopPropagation()}>
                  <ExternalLink className="w-6 h-6 text-gray-white" />
                </Link>
              )}
              {devLink && (
                <Link href={devLink} onClick={(e) => e.stopPropagation()}>
                  <FaGithub className="w-6 h-6 text-gray-white" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
