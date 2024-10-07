import CouponPage from '@/pages/coupon/coupon.page';

const Page = ({ params }: { params: { id: string } }) => {
  return <CouponPage params={params} />;
};

export default Page;
