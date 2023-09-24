import React, { useEffect, useRef, useState } from 'react';

interface PieChartProps {
  data: { labels: string[]; values: number[] };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const updateCanvasSize = () => {
	if (canvasRef.current) {
	  const parent = canvasRef.current.parentElement;
	  if (parent) {
		const parentWidth = parent.clientWidth;
		const parentHeight = parent.clientHeight;
		const minSize = Math.min(parentWidth, parentHeight);
		setCanvasSize({ width: minSize, height: minSize });
	  }
	}
  };

  useEffect(() => {
	const canvas = canvasRef.current;
	if (canvas) {
		const canvasWidth = canvasSize.width;
		const canvasHeight = canvasSize.height;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

	  const ctx = canvas.getContext('2d');
	  if (ctx) {
		const total = data.values.reduce((acc, value) => acc + value, 0);
		let startAngle = 0;

		const sliceRadius = Math.min(canvasWidth, canvasHeight) / 2;

		for (let i = 0; i < data.values.length; i++) {
		  const sliceAngle = (2 * Math.PI * data.values[i]) / total;

		  ctx.beginPath();
		  ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
		  ctx.arc(
			canvasWidth / 2,
			canvasHeight / 2,
			sliceRadius,
			startAngle,
			startAngle + sliceAngle
		  );

		  // Fill slice with color
		  ctx.fillStyle = getRandomColor(i);
		  ctx.fill();

		  // Check if mouse is over the current slice
		canvas.addEventListener('mousemove', (e) => {
			const rect = canvas.getBoundingClientRect();
			const mouseX = e.clientX - rect.left;
			const mouseY = e.clientY - rect.top;

			const angle = Math.atan2(
				mouseY - canvasHeight / 2,
				mouseX - canvasWidth / 2
			)
			const normalizedAngle =
				angle < 0 ? angle + 2 * Math.PI : angle;

			if (
			  normalizedAngle >= startAngle &&
			  normalizedAngle <= startAngle + sliceAngle
			) {
				setHoveredSlice(i);
			}
			else {
				setHoveredSlice(null);
			}
		})

		  // Clear the hover state on mouseout
		canvas.addEventListener('mouseout', () => {
			setHoveredSlice(null);
		})

		  // Draw label on hover
		if (hoveredSlice === i) {
			const labelX =
				canvas.width / 2 +
				(sliceRadius * 0.8) * Math.cos(startAngle + sliceAngle / 2);
			const labelY =
				canvas.height / 2 +
				(sliceRadius * 0.8) * Math.sin(startAngle + sliceAngle / 2);

			ctx.font = '12px Arial';
			ctx.fillStyle = 'black';
			ctx.textAlign = 'center';
			ctx.fillText(data.labels[i], labelX, labelY);
		}

		startAngle += sliceAngle;
	
		}
	  }
	}
  }, [data, canvasSize, hoveredSlice]);

  // Handle resizing of the canvas when the parent size changes
  useEffect(() => {
	window.addEventListener('resize', updateCanvasSize);
	updateCanvasSize(); // Initial size calculation
	return () => {
	  window.removeEventListener('resize', updateCanvasSize);
	};
  }, []);

  // Helper function to generate random colors
  const getRandomColor = (index: number) => {
	const colors = [
	  'rgba(255, 99, 132, 0.7)',
	  'rgba(54, 162, 235, 0.7)',
	  'rgba(255, 206, 86, 0.7)',
	  'rgba(75, 192, 192, 0.7)',
	  'rgba(153, 102, 255, 0.7)',
	];
	return colors[index % colors.length];
  };

  return <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />;
};

export default PieChart;
