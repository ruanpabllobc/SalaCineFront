import { ReactNode } from "react";

type TableProps = {
  children: ReactNode;
  className?: string;
};

type RowProps = {
  children?: ReactNode;
  className?: string;
  cellsContent?: ReactNode[];
};

type CellProps = {
  children?: ReactNode;
  className?: string;
  colSpan?: number;
  textColor?: "light" | "dark";
};

type HeaderCellProps = {
  children?: ReactNode;
  className?: string;
  colSpan?: number;
};

const Root = ({ children, className = "" }: TableProps) => (
  <div className={`flex justify-center w-full ${className}`}>
    <div className="bg-white shadow-[0_-4px_10px_0_rgba(250,244,250,1)] max-w-[750px] w-full overflow-hidden border-b-2 border-black pt-[40px] pr-[20px] pb-[40px] pl-[20px]">
      <table className="w-full table-fixed border-collapse">{children}</table>
    </div>
  </div>
);

const Cell = ({
  children,
  className = "",
  colSpan,
  textColor = "dark",
}: CellProps) => {
  const textColorClass =
    textColor === "light" ? "text-[#969696]" : "text-[#181818]";

  return (
    <td
      className={`
        ${textColorClass} 
        p-[16px]
        text-center 
        align-middle
        ${className}
      `}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

const HeaderCell = ({ children, className = "", colSpan }: HeaderCellProps) => {
  return (
    <th
      className={`
        bg-[#EBEBEB]
        p-[16px]
        text-center 
        align-middle
        font-normal
        text-[#181818]
        ${className}
      `}
      colSpan={colSpan}
    >
      {children}
    </th>
  );
};

const Row = ({ children, className = "", cellsContent }: RowProps) => {
  if (cellsContent) {
    return (
      <tr className={className}>
        {cellsContent.map((content, index) => (
          <Cell key={index} textColor={index % 2 === 0 ? "light" : "dark"}>
            {content}
          </Cell>
        ))}
      </tr>
    );
  }

  return <tr className={className}>{children}</tr>;
};

const Head = ({ children, className = "" }: TableProps) => (
  <thead className={className}>{children}</thead>
);

const Body = ({ children, className = "" }: TableProps) => (
  <tbody className={className}>{children}</tbody>
);

export const Table = {
  Root,
  Head,
  Body,
  Row,
  Cell,
  HeaderCell,
};
