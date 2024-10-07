'use client';
import SectionDetailsPage from '@/pages/section-details/section-details.page';

const SectionDetails = ({ params }: { params: { id: string } }) => {
  return <SectionDetailsPage id={params.id} />;
};

export default SectionDetails;
