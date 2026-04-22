"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CountUp } from "@/components/count-up";
import { getKeyAchievements, KeyAchievementRow } from "@/actions/key-achievements";

export function KeyAchievementsSection() {
  const [achievements, setAchievements] = useState<KeyAchievementRow[]>([]);

  useEffect(() => {
    getKeyAchievements().then(setAchievements);
  }, []);

  if (achievements.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {achievements.map((a) => (
        <Card
          key={a.id}
          className="bg-background border-primary/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300"
        >
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-primary">
              <CountUp end={a.value} suffix={a.suffix} />
            </CardTitle>
            <CardDescription>{a.label}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{a.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
