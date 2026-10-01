'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { MdLocationOn, MdEmail } from 'react-icons/md';
import { FcCustomerSupport, FcCallback } from 'react-icons/fc';
import { ImWhatsapp } from 'react-icons/im';
import { Fade } from 'react-reveal';
import Input from '@/components/Input';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import Confirmation from './Confirmation';
import { trackLead } from '@/lib/analytics';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'; // Import country and region dropdowns

// Contact categories. `value` is what gets emailed and must not change;
// `slug` is what ?category= links use (header, home page, intent popup).
const REASONS = [
  { value: 'Quality', slug: 'quality', kn: 'ಗುಣಮಟ್ಟ' },
  { value: 'MRP Related', slug: 'mrp', kn: 'ಎಂಆರ್‌ಪಿ (ಗರಿಷ್ಠ ಮಾರಾಟ ಬೆಲೆ) ಸಂಬಂಧಿತ' },
  { value: 'New Agency/Parlour', slug: 'new-agency-parlour', kn: 'ಹೊಸ ಏಜೆನ್ಸಿ / ಪಾರ್ಲರ್' },
  { value: 'Product Non-Availability', slug: 'product-non-availability', kn: 'ಉತ್ಪನ್ನ ಲಭ್ಯವಿಲ್ಲ' },
  { value: 'Bulk Order', slug: 'bulk-order', kn: 'ಸಗಟು ಮಾರಾಟ (ಬಲ್ಕ್ ಆರ್ಡರ್)' },
  { value: 'Others', slug: 'others', kn: 'ಇತರೆ' },
];

const Contact = () => {
  const locale = useParams().locale;
  const categoryParam = useSearchParams().get('category');
   
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    profession: '',
    streetAdd: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    telephone: '',
    fax: '',
    mobile: '',
    email: '',
    message: '',
    reason: '' // New field for the dropdown
  });

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // Pre-select the category from ?category=bulk-order etc.
  useEffect(() => {
    const match = REASONS.find((r) => r.slug === (categoryParam || '').toLowerCase());
    if (match) setFormData((prev) => ({ ...prev, reason: match.value }));
  }, [categoryParam]);

  const handleChange = (e) => {
     
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));

  };

  const handleCountryChange = (val) => {
    setFormData({ ...formData, country: val });
  };

  const handleStateChange = (val) => {
    setFormData({ ...formData, state: val });
  };

  const handleCityChange = (selectedCity) => {
    setFormData({ ...formData, city: selectedCity });
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'streetAdd', 'city', 'state', 'country', 'mobile', 'message'];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      alert(locale === 'en' ? 'Please fill the details' : 'ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ');
      return;
    }

    setErrors({});

    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (data?.status === 200) {
      trackLead(formData.reason);
      setIsOpen(true);
    }
  };

  const handleReset = () => {
    setIsOpen(false);
    setFormData({
      name: '',
      organization: '',
      profession: '',
      streetAdd: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      telephone: '',
      fax: '',
      mobile: '',
      email: '',
      message: '',
      reason: '' // Reset the reason field as well
    });
    setErrors({});
  };

  return (
    <div className="w-full h-full absolute top-36 z-[-1] bg-[#F6F6F6]">
      <section className="w-full h-80 pt-14 relative grid place-items-center company-bg">
        <iframe
          align="middle"
          allowFullScreen
          frameBorder="0"
          height="100%"
          scrolling="true"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.518745456276!2d77.60279164133709!3d12.938623223603017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15ef1a5c4365%3A0xf0eb81ef4c8cd455!2sKMF!5e0!3m2!1sen!2sin!4v1456068635330"
          width="100%"
          className="z-[100]"></iframe>
      </section>

      {isOpen && <Confirmation handleReset={handleReset} />}

      <div className="w-full bg-[#F6F6F6]">
        <div className="mb-10 pt-10 relative w-full flex justify-center items-center">
          <h1 className="text-primary-main relative z-10 font-heading text-5xl font-extrabold uppercase">
            {locale === 'en' ? 'CONTACT US' : 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ'}
          </h1>
        </div>

        <div className="w-full grid md:grid-cols-3 md:p-9">
          <div className="m-4 col-span-2 border border-neutral-light1 bg-neutral-light4 rounded-tl-3xl rounded-br-3xl">
            <div className="w-full p-12">
              <p className="text-xl text-primary-darker font-heading">
                {locale === 'en' ? 'Get in Touch' : 'ಸಂಪರ್ಕಿಸಿ'}
              </p>
              <p className="mt-6 text-base font-semibold text-neutral-dark1">
                {locale === 'en'
                  ? 'Kindly fill in the particulars given below. We will be pleased to revert back to you'
                  : 'ಕೆಳಗೆ ನೀಡಿರುವ ವಿವರಗಳನ್ನು ದಯವಿಟ್ಟು ಭರ್ತಿ ಮಾಡಿ. ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ದಯಮಾಡಿ ನಿರೀಕ್ಷಣೆಯಲ್ಲಿರಿ'}
              </p>

              <div className="mt-3 w-full lg:grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { title: 'Name', name: 'name', type: 'text', required: true, astrik: '*' },
                  { title: 'Organisation', name: 'organization', type: 'text' },
                  { title: 'Profession', name: 'profession', type: 'text' },
                  {
                    title: 'Street Address',
                    name: 'streetAdd',
                    type: 'text',
                    required: true,
                    astrik: '*'
                  },
                  { title: 'Postal Code or Zip', name: 'pincode', type: 'number', astrik: '*' },
                  {
                    title: 'Mobile No',
                    name: 'mobile',
                    type: 'number',
                    required: true,
                    astrik: '*'
                  },
                  { title: 'E-mail', name: 'email', type: 'email', required: true },
                   
                ].map((input, index) => (
                  <Input
                    key={index}
                    title={input.title}
                    type={input.type}
                    style="mt-7"
                    name={input.name}
                    value={formData[input.name]}
                    setInfo={handleChange}
                    required={input.required}
                    astrik={input.astrik}
                  />
                ))}


                <div className="w-full mt-7  ">
                  <label htmlFor="country" className="text-base">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <CountryDropdown
                    value={formData.country}
                    onChange={handleCountryChange}
                    classes="mt-4 w-full rounded-xl border border-neutral-dark4 p-2 bg-neutral-light4"
                  />
                </div>

                <div className="w-full mt-7  ">
                  <label htmlFor="state" className="text-base">
                    State <span className="text-red-500">*</span>
                  </label>
                  <RegionDropdown
                    country={formData.country}
                    value={formData.state}
                    onChange={handleStateChange}
                    classes="mt-4 w-full rounded-xl border border-neutral-dark4 p-2 bg-neutral-light4"
                  />
                </div>

                <Input
                    
                    title={"City"}
                    type={'text'}
                    style="mt-7  "
                    name={"city"}
                    value={formData['city']}
                    setInfo={handleChange}
                    required={true}
                    astrik={"*"}
                  />

                <div className="w-full mt-7 md:col-span-2">
                  <label htmlFor="reason" className="text-base">
                  {locale === 'kn' ? 'ವರ್ಗಗಳು' : 'Categories'} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    onChange={handleChange}
                    value={formData.reason}
                    className="mt-4 w-full rounded-xl border border-neutral-dark4 p-2 bg-neutral-light4"
                  >
                    <option value="">{locale === 'kn' ? 'ಕಾರಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ' : 'Select a reason'}</option>
                    {REASONS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {locale === 'kn' ? r.kn : r.value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full mt-7 md:col-span-2">
                  <Fade bottom>
                    <label htmlFor="message" className="text-base">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      onChange={handleChange}
                      disabled={!formData.reason}
                      value={formData.message}
                      className="mt-4 w-full h-[200px] rounded-xl text-lg border border-neutral-dark4 p-2 bg-neutral-light4"
                    />
                  </Fade>
                </div>
              </div>

              <div className="mt-10 md:mt-16 lg:mt-28 flex justify-center md:justify-end">
                <button
                  onClick={handleSubmit}
                  className="w-48 h-14 flex justify-center items-center bg-primary-main rounded-full">
                  <p className="text-base text-neutral-light4 font-heading font-semibold">
                    {locale === 'kn' ? 'ಸಲ್ಲಿಸಿ' : 'Submit'}
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div className="md:m-4 p-4 md:p-0 w-full space-y-9">
            <ContactInfo
              icon={<MdLocationOn size={40} color="red" />}
              title={locale === 'en' ? 'Address' : 'ವಿಳಾಸ'}
              content={
                locale === 'en'
                  ? 'Karnataka Co-operative Milk Producers Federation Ltd\n#2915, KMF Complex,D.R.College Post,Dr.M.H.Marigowda Road,BENGALURU - 560 029. Karnataka.'
                  : 'ಕರ್ನಾಟಕ ಸಹಕಾರಿ ಹಾಲು ಉತ್ಪಾದಕರ ಮಹಾಮಂಡಳ ನಿಯಮಿತ, ಕಹಾಮ ಸಂಕೀರ್ಣ,\nಅಂಚೆ ಪೆಟ್ಟಿಗೆ ಸಂಖ್ಯೆ- 2915, ಡಿ.ಆರ್. ಕಾಲೇಜು ಪೋಸ್ಟ್, ಡಾ.ಎಂ.ಹೆಚ್.ಮರಿಗೌಡ ರಸ್ತೆ, ಬೆಂಗಳೂರು-560029, ಕರ್ನಾಟಕ'
              }
            />
            <ContactInfo
              icon={<FcCustomerSupport size={40} />}
              title={locale === 'en' ? 'Toll Free' : 'ಶುಲ್ಕರಹಿತ'}
              content={
                locale === 'en'
                  ? '1800 425 8030 10.00AM - 5.30PM Except on Second Saturday, Fourth Saturday & GOVT. Holidays'
                  : '080-260 96800 ಸಹಾಯವಾಣಿ: 1800 425 8030 ಟೋಲ್ ಫ್ರೀ 10.00AM - 5.45PM (ಎರಡನೇ ಮತ್ತು ನಾಲ್ಕನೇ ಶನಿವಾರ, ಭಾನುವಾರ ಮತ್ತು ಇತರ ರಾಜ್ಯ ಸರ್ಕಾರಿ ರಜಾದಿನಗಳನ್ನು ಹೊರತುಪಡಿಸಿ'
              }
            />
            <ContactInfo
              icon={<FcCallback size={40} />}
              title={locale === 'en' ? 'Phone' : 'ದೂರವಾಣಿ'}
              content="080-260 96800"
              href="tel:+918026096800"
            />
            <ContactInfo
              icon={<ImWhatsapp size={40} color="green" />}
              title={locale === 'en' ? 'Whatsapp' : 'ವಾಟ್ಸ್ ಆ್ಯಪ್'}
              content="7899683696"
              href="https://wa.me/917899683696"
            />
            <ContactInfo
              icon={<MdEmail size={40} color="red" />}
              title={locale === 'en' ? 'Email' : 'ಮಿಂಚಂಚೆ'}
              content="customercare.nandini@kmf.coop"
              href="mailto:customercare.nandini@kmf.coop"
            />
          </div>
        </div>
      </div>
       
<Footer />
    </div>
  );
};

const ContactInfo = ({ icon, title, content, href }) => (
  <div className="p-6 border border-neutral-light1 bg-neutral-light4 rounded-tl-3xl rounded-br-3xl max-w-100 transition-all duration-100 hover:scale-[1.06]">
    <div className="space-y-3 mt-4 mb-4 w-full">
      <p className="text-xl font-semibold text-primary-darker">{title}</p>
      <div className="flex flex-col lg:flex-row items-start w-full">
        <div className="w-1/5 transition-all duration-100 hover:scale-[1.1]">{icon}</div>
        <div className="ml-2 w-full">
          {href ? (
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-base font-semibold text-neutral-dark1 hover:underline break-all">
              {content}
            </a>
          ) : (
            <p className="text-base font-semibold text-neutral-dark1">{content}</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
