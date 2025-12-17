"use client";

import { Property } from "@prisma/client";

/**
 * Client component that displays in-review properties
 * Receives data as props from server component
 */
const InReviewProprietes = ({ properties }: { properties: Property[] }) => {
  return (
    <div>
      {properties.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          No properties in review
        </div>
      ) : (
        properties.map((property) => (
          <div key={property.id} className="text-sm">
            {property.name}
          </div>
        ))
      )}
    </div>
  );
};

export default InReviewProprietes;

