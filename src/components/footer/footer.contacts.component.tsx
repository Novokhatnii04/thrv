const FooterContacts = ({ cStyles = '' }: { cStyles?: string }) => {
  return (
    <div className={`${cStyles}`}>
      <h4 className="text-lg text-brand-white mb-3 capitalize">Contact Us</h4>
      <div className="text-sm leading-8 text-brand-white opacity-80">
        <span>Email: info@thrivecard.co.uk</span>
      </div>
    </div>
  );
};

export default FooterContacts;
