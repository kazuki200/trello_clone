import { default as BoardPage } from "../../page";

type PageProps = {
  params: {
    boardId: string;
    cardId: string;
  };
};

const Page = ({ params }: PageProps) => {
  return <BoardPage params={params} />;
};

export default Page;
