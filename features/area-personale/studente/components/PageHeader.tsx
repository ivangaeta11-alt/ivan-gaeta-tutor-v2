import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8 min-w-0">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-slate-500 font-light text-[15px] max-w-2xl break-words">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
