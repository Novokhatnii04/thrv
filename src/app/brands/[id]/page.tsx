'use client';
import BrandDetailPage from '@/pages/brands/brand-detail.page';

const Page = ({ params }: { params: { id: string } }) => {
  return <BrandDetailPage params={params} />;
};

export default Page;
