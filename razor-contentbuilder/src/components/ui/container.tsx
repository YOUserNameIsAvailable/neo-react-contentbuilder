import cn from 'classnames';
interface Props {
  className?: string;
  children?: any;
  el?: HTMLElement;
  clean?: boolean;
}

const Container: React.FC<Props> = ({
  children,
  className,
  el = 'div',
  clean,
}) => {
  const rootClassName = cn(className, {
    'mx-auto max-w-[480px] px-4 md:px-6 lg:px-8 2xl:px-20': !clean,
  });

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any;

  return <Component className={`mx-auto ${rootClassName}`}>{children}</Component>;
};

export default Container;
