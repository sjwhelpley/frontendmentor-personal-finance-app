"use client";

interface DonutChartProps {
  data: Array<{
    category: string;
    spent: number;
    limit: number;
    color: string;
  }>;
  size?: number;
  strokeWidth?: number;
}

export default function DonutChart({
  data,
  size = 200,
  strokeWidth = 28,
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const innerRadius = radius - strokeWidth / 2;
  const outerRadius = radius + strokeWidth / 2;

  // Calculate total spent and total limit
  const totalSpent = data.reduce((sum, item) => sum + item.spent, 0);
  const totalLimit = data.reduce((sum, item) => sum + item.limit, 0);

  // Helper function to create arc path
  const createArcPath = (
    startAngle: number,
    endAngle: number,
    innerR: number,
    outerR: number
  ) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = center + innerR * Math.cos(startAngleRad);
    const y1 = center + innerR * Math.sin(startAngleRad);
    const x2 = center + innerR * Math.cos(endAngleRad);
    const y2 = center + innerR * Math.sin(endAngleRad);
    const x3 = center + outerR * Math.cos(endAngleRad);
    const y3 = center + outerR * Math.sin(endAngleRad);
    const x4 = center + outerR * Math.cos(startAngleRad);
    const y4 = center + outerR * Math.sin(startAngleRad);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return [
      `M ${x1} ${y1}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      "Z",
    ].join(" ");
  };

  // Calculate angles for each segment
  let currentAngle = -90; // Start at top
  const segments = data
    .filter((item) => item.spent > 0) // Only show segments with spending
    .map((item) => {
      const percentage = (item.spent / totalLimit) * 100;
      const angle = (percentage * 360) / 100;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;

      currentAngle = endAngle;

      return {
        ...item,
        pathData: createArcPath(startAngle, endAngle, innerRadius, outerRadius),
        percentage,
      };
    });

  // Calculate remaining (unused) portion
  const remainingPercentage = ((totalLimit - totalSpent) / totalLimit) * 100;
  const remainingAngle = (remainingPercentage * 360) / 100;
  const remainingStartAngle = currentAngle;
  const remainingEndAngle = remainingStartAngle + remainingAngle;

  // Calculate white circle size to overlap with the chart
  const whiteCircleRadius = size * 0.4; // Overlaps with inner part of donut

  return (
    <div
      className="relative w-full max-w-[200px] mx-auto"
      style={{ aspectRatio: "1 / 1" }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full transform -rotate-90"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Remaining (unused) portion - light gray */}
        {remainingPercentage > 0 && (
          <path
            d={createArcPath(
              remainingStartAngle,
              remainingEndAngle,
              innerRadius,
              outerRadius
            )}
            fill="#F2F2F2"
            stroke="none"
          />
        )}

        {/* Spent segments */}
        {segments.map((segment, index) => (
          <path
            key={index}
            d={segment.pathData}
            fill={segment.color}
            stroke="none"
          />
        ))}
      </svg>

      {/* Semi-transparent white circle for layered effect */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx={center}
          cy={center}
          r={whiteCircleRadius}
          fill="white"
          opacity={0.6}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <p className="text-preset-1">${totalSpent.toFixed(0)}</p>
        <p className="text-preset-4 text-grey-500">
          of ${totalLimit.toFixed(0)} limit
        </p>
      </div>
    </div>
  );
}
