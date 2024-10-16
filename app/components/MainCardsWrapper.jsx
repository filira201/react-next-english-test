import Card from "./Card";

const MainCardsWrapper = ({ themes }) => {
  return (
    <>
      {themes.map((theme) => {
        return <Card key={theme.id} {...theme} />;
      })}
    </>
  );
};

export default MainCardsWrapper;
