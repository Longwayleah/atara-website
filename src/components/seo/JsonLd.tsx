type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Renders Schema.org JSON-LD for crawlers */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
