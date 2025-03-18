import React, { useState, useEffect } from "react";

const NotFound = () => {
  const [playerX, setPlayerX] = useState(250);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [enemySpeed, setEnemySpeed] = useState(1); // Tốc độ kẻ địch ban đầu

  // Xử lý phím bấm (di chuyển tàu và bắn)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") setPlayerX((prev) => Math.max(0, prev - 20));
      if (e.key === "ArrowRight")
        setPlayerX((prev) => Math.min(480, prev + 20));
      if (e.key === " ") {
        setBullets((prev) => [...prev, { x: playerX + 20, y: 450 }]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerX]);

  // Di chuyển đạn
  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((prev) =>
        prev.map((b) => ({ ...b, y: b.y - 10 })).filter((b) => b.y > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Sinh kẻ địch mới sau mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies((prev) => [...prev, { x: Math.random() * 450, y: 0 }]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Di chuyển kẻ địch và kiểm tra va chạm
  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies(
        (prev) =>
          prev
            .map((enemy) => ({ ...enemy, y: enemy.y + enemySpeed })) // Điều chỉnh tốc độ kẻ địch
            .filter((enemy) => enemy.y < 500) // Xóa kẻ địch khi xuống dưới
      );

      // Kiểm tra va chạm giữa đạn và kẻ địch
      setBullets((prevBullets) =>
        prevBullets.filter((bullet) => {
          const hitEnemyIndex = enemies.findIndex(
            (enemy) =>
              bullet.x > enemy.x &&
              bullet.x < enemy.x + 40 &&
              bullet.y < enemy.y + 40
          );

          if (hitEnemyIndex !== -1) {
            setEnemies((prevEnemies) =>
              prevEnemies.filter((_, index) => index !== hitEnemyIndex)
            );
            setScore((prevScore) => prevScore + 10); // Tăng điểm
            return false;
          }
          return true;
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, [enemies, bullets, enemySpeed]);

  // Tăng tốc kẻ địch sau mỗi 10 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setEnemySpeed((prev) => prev + 0.5);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: 500,
        height: 500,
        backgroundColor: "black",
      }}
    >
      <h2 style={{ color: "white", position: "absolute", top: 10, left: 10 }}>
        Score: {score}
      </h2>
      <div
        style={{
          position: "absolute",
          left: playerX,
          bottom: 20,
          width: 40,
          height: 40,
          backgroundColor: "blue",
        }}
      ></div>
      {bullets.map((bullet, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: bullet.x,
            top: bullet.y,
            width: 5,
            height: 10,
            backgroundColor: "red",
          }}
        ></div>
      ))}
      {enemies.map((enemy, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: enemy.x,
            top: enemy.y,
            width: 40,
            height: 40,
            backgroundColor: "green",
          }}
        ></div>
      ))}
    </div>
  );
};

export default NotFound;
