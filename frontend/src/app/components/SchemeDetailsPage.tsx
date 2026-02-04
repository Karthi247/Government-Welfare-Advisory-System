import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

export function SchemeDetailsPage({
  schemeId,
  onBack,
}: {
  schemeId: number | null;
  onBack: () => void;
}) {
  const [scheme, setScheme] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Handle null ID properly
    if (schemeId === null) {
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`http://localhost:8080/api/schemes/${schemeId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Scheme not found");
        }
        return res.json();
      })
      .then((data) => {
        setScheme(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load scheme:", err);
        setLoading(false);
      });
  }, [schemeId]);

  if (loading) {
    return <p className="p-6">Loading scheme details...</p>;
  }

  if (!scheme) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground mb-4">
          Scheme details not found.
        </p>
        <Button variant="outline" onClick={onBack}>
          ← Back to Schemes
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Button variant="outline" onClick={onBack}>
        ← Back to Schemes
      </Button>

      <Card className="p-6">
        <h1 className="text-2xl mb-2">{scheme.schemeName}</h1>
        <p className="text-muted-foreground mb-4">
          {scheme.category} CATEGORY
        </p>

        <p className="mb-6">{scheme.description}</p>

        <Section title="Eligibility">
          {scheme.schemeDetails?.eligibility}
        </Section>

        <Section title="Benefits">
          {scheme.schemeDetails?.benefits}
        </Section>

        <Section title="Documents Required">
          {scheme.schemeDetails?.documentsRequired}
        </Section>

        <Section title="Application Process">
          {scheme.schemeDetails?.applicationProcess}
        </Section>

        <div className="mt-6 flex gap-3">
          <Button
            className="bg-accent"
            onClick={() =>
              window.open(
                scheme.schemeDetails?.officialWebsite,
                "_blank"
              )
            }
          >
            Official Website
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  return (
    <div className="mb-4 p-4 bg-muted/50 rounded-lg">
      <h3 className="mb-1">{title}</h3>
      <p className="text-muted-foreground">{children}</p>
    </div>
  );
}
