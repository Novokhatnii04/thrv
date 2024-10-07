'use client';
import { BrandLayout } from '@/layout/brand/brand.layout';

const BrandDetailPage = ({ params }: { params: { id: string } }) => {
  return <BrandLayout id={params?.id} />;
};

export default BrandDetailPage;
