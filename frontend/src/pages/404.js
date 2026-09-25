function PageNotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        borderRadius: "20px",
      }}
    >
      <video
        src="/404.webm"
        width="640"
        autoPlay
        muted
        loop
        playsInline
      ></video>
    </div>
  );
}

export default PageNotFound;
