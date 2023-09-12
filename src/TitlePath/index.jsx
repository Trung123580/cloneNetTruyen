function TitlePath({ to, title }) {
  const arrow = '>>';
  return (
    <div>
      <span>Trang chu {arrow}</span>
      {to ? <span> {to}</span> : <span>theloai</span>}
      {!!title && <span>{`${arrow} ${title}`}</span>}
    </div>
  );
}

export default TitlePath;
