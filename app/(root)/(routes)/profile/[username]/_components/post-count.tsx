interface PostCountProps {
  value: number | string;
}

export function PostCount({ value }: PostCountProps) {
  return (
    <div className="flex max-ms:flex-col items-center ms:justify-start justify-center ms:text-base text-sm max-ms:space-y-1.5 font-normal text-primary/90 gap-x-2 py-1 max-ms:flex-1">
      <strong>{value}</strong>
      <p>posts</p>
    </div>
  );
}
