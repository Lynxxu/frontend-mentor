import React, { useEffect, useState } from 'react';
const Star = () => (
      <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44zm.678 2.033-2.361 4.792-5.246.719 3.848 3.643-.948 5.255 4.707-2.505 4.707 2.505-.951-5.236 3.851-3.662-5.314-.756z" fill-rule="nonzero"/></svg>
  );
const Circle = ()=>{
    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497 8.497-3.807 8.497-8.497-3.807-8.498-8.497-8.498z" fill-rule="nonzero"/></svg>
}
const Hexagon = ()=>{
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.839 4l4.857 8.5-4.857 8.5h-9.678l-4.857-8.5 4.857-8.5h9.678zm1.161-2h-12l-6 10.5 6 10.5h12l6-10.5-6-10.5z"/></svg>
}
const Triangle = ()=>{    
    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.095 19.882 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367zm1.935-.384h15.939l-7.97-14.22z" fill-rule="nonzero"/></svg>
}



const GeometryRain = ({ type: Geometry, color, duration, delay, rotation }) => {
  const style = {
    animation: `drop ${duration}s linear ${delay}s infinite, rotate ${rotation}s linear infinite`,
    color: color,
    position: 'absolute',
    left: `${Math.random() * 100}vw`,
    top: '-5%',
  };

  return <div style={style}><Geometry /></div>;
};

const colors = ['#ff6347', '#4682b4', '#32cd32', '#ffa500', '#6a5acd'];

const BackgroundRain = () => {
  const [geometries, setGeometries] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const type = [Star, Circle, Hexagon, Triangle][Math.floor(Math.random() * 3)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = Math.random() * 10 + 5; // 5 to 15 seconds
      const rotation = Math.random() * 20 + 10; // 10 to 30 seconds
      const delay = -Math.random() * 10; // Start at different times
      setGeometries(geoms => [...geoms, { type, color, duration, delay, rotation }]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {geometries.map((geom, index) => (
        <GeometryRain key={index} {...geom} />
      ))}
    </div>
  );
};

export default BackgroundRain;
