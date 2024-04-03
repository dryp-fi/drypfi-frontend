type SectionContainerProps = {
  title: string;
  children: React.ReactNode;
};

const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  children,
}) => (
  <div>
    <p className='text-sm text-[#707070] mb-1'>{title}</p>
    <div className='bg-[#1e1e1e] p-3 rounded-md space-y-4'>{children}</div>
  </div>
);

export default SectionContainer;
