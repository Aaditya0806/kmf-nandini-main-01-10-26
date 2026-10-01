'use client';
import React, { useState, useEffect } from 'react';
import portfolioImg from '@/images/portfolio/portfolio.png';
// import founderOfMilkImg from '@/images/portfolio/founder-of-milk.jpeg';
import founderOfMilkImg from '@/images/portfolio/founder-of-milk.jpeg';
import brandAmbasImg from '@/images/portfolio/brand.jpeg';
import mdkn from '@/images/portfolio/md-kn.png';
import mden from '@/images/portfolio/md-en.png';
import md from '@/images/portfolio/md.jpeg';
import milkImg from '@/images/portfolio/milkImg.png';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import headImg from '@/images/directors/1-1.png';
import headengImg from '@/images/directors/headeng.png';
import founderOfMilk2Img from '@/images/portfolio/founder-of-milk.png';
import KRISHNAPPA from '@/images/portfolio/KRISHNAPPA.png';
import achivement from '@/images/portfolio/achiv.jpg';
import hom from '@/images/portfolio/hom.jpg';
import titleBG from '@/images/portfolio/title-bg.png';
import flag from '@/images/portfolio/flag.jpg';
import band1 from '@/images/portfolio/brand-1.jpeg';
import band2 from '@/images/portfolio/brand-2.jpeg';
import band3 from '@/images/portfolio/brand-3.jpeg';
import band4 from '@/images/portfolio/brand-4.jpg';

import home1 from '@/images/portfolio/home/1.jpg';
import home2 from '@/images/portfolio/home/2.png';
import home3 from '@/images/portfolio/home/3.png';
import home4 from '@/images/portfolio/home/4.png';
import home5 from '@/images/portfolio/home/5.png';
import home6 from '@/images/portfolio/home/6.png';
import home7 from '@/images/portfolio/home/7.png';

// import pdf1 from '@/images/portfolio/pdf/Ksheera_March_2024_4438048407.pdf';
// import home8 from '@/images/portfolio/home/8.png';

import spon1 from '@/images/portfolio/spon/1.jpg';
import spon2 from '@/images/portfolio/spon/2.jpg';
import spon3 from '@/images/portfolio/spon/3.jpg';
import spon4 from '@/images/portfolio/spon/4.jpg';
import spon5 from '@/images/portfolio/spon/5.png';
import spon6 from '@/images/portfolio/spon/6.png';
import spon7 from '@/images/portfolio/spon/7.jpg';
import spon8 from '@/images/portfolio/spon/8.jpg';
import spon9 from '@/images/portfolio/spon/9.jpg';
import spon10 from '@/images/portfolio/spon/10.png';


import home9 from '@/images/portfolio/home/9.png';
import home10 from '@/images/portfolio/home/10.png';
import home11 from '@/images/portfolio/home/11.png';

// import  from "'@/images/portfolio/flag.jpg"
import { Carousel as Carousels } from 'react-responsive-carousel';

// import homeVideo from "/video/video1.mp4"

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Autoplay, } from 'swiper/modules';
// import spon1 from '@/images/sponsored/1.jpg';
// import spon2 from '@/images/sponsored/2.jpg';
// import spon3 from '@/images/sponsored/3.png';
// import spon4 from '@/images/sponsored/4.jpg';
// import spon5 from '@/images/sponsored/5.png';
// import spon6 from '@/images/sponsored/6.jpg';
// import spon7 from '@/images/sponsored/7.jpg';
// import spon8 from '@/images/sponsored/8.jpg';
// import spon9 from '@/images/sponsored/9.jpg';
// import spon10 from '@/images/sponsored/10.png';
import { IoMenu } from 'react-icons/io5';
import { GrClose } from 'react-icons/gr';
import { HiArrowSmallLeft } from 'react-icons/hi2';
import { HiArrowSmRight } from 'react-icons/hi';

import { LuMouse } from 'react-icons/lu';

import facebookIco from '@/images/footer/FB.svg';
import mailIco from '@/images/footer/Email.svg';
import twitterIco from '@/images/footer/X.svg';
import insta from '@/images/footer/insta.svg';
import ytIco from '@/images/footer/yt.svg';

import downarrowIco from '@/images/icons/downarrow.svg';
import uparrowIco from '@/images/icons/uparrow.svg';
import locationIco from '@/images/header-ico/location.svg';
import contactIco from '@/images/header-ico/contact.svg';
import { usePathname } from 'next/navigation';

import './style.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

import { achievements as achievementItems } from '@/configtext/companyProfile';
import useApi from '@/hooks/useApi';

import useLocale from '@/hooks/useLocale';
import Link from 'next/link';
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useMyContext } from '@/context/headerContext';
import { useParams } from 'next/navigation';
import PdfPreview from './PdfPreview';
// import PDFViewer2 from './PdfPreview2';
// import PdfPreview2 from './PdfPreview2';
import MyPdfViewer from './PdfPreview2';
import { useRouter } from 'next/navigation';
import { Fade, Zoom } from 'react-reveal';

function Portfolio() {
  const [achievments, setAchievments] = useState([]);
  const [slideView, setSlideView] = useState(3);
  const axios = useApi();
  const [currentIndex, setCurrentIndex] = useState(0);
  const locale = useLocale().locale;
  const [banners, setBanners] = useState([]);
  const [headerItem, setHeaderItem] = useState([]);
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data: header } = await axios.get('/api/header');
      setHeaderItem(header?.data);
    })();
  }, [params.locale]);

  const handleLanguageChange = () => {
    if (pathname === '/kn') {
      return router.push('/');
    }
    if (pathname === '/') {
      return router.push('/kn');
    }
    const newLanguagePrefix = pathname.startsWith('/kn') ? '/en' : '/kn';
    const newUrl = pathname.replace(/^\/(kn|en)\//, newLanguagePrefix + '/');
    router.push(newUrl);
  };

  const[pdf, setPdf] = useState();
  const [sponsore, setSponsore] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const { isScroll } = useMyContext();
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  const [showPdf, setShowPdf] = useState(false);
  const pdfUrlView = '/pdJan23.pdf'; // Ensure this path is correct

  const handleButtonClickPdf = () => {
    setShowPdf(true);
  };

  const pdfUrl2 = '/pdJan23.pdf';

  const [showFullText, setShowFullText] = useState(false);

  const toggleTextVisibility = () => {
    setShowFullText(!showFullText);
  };

  const kurienEnglishText =
    "Mr. M.V. Krishnappa hailed from Kolar district and held a deep concern for the welfare of farmers. He was born in Motakapalli village in Mulbagilu Taluk on June 1st, 1918. Embarking on a political journey, he was first elected to the Lok Sabha in 1952. During his tenure, the central government, under the leadership of Jawaharlal Nehru, appointed him as the Agriculture and Food Minister. At that time, dairy farmers in the state primarily relied on indigenous cattle breeds. Mr. M.V.K. foresaw challenges in meeting urban milk demands if dairy farming continued as such. Thus, during his ministerial tenure, he observed the advanced milk production capacities of foreign breeds during visits abroad. In an effort to enhance indigenous breeds, he imported HF breed heifers from Holland and distributed them to farmers. Collaborating with the central government, he successfully imported 8 to 10 foreign breed heifers to Karnataka. His efforts extended to breeding activities in Mysore, Bangalore, Mangalore, and hill regions, significantly boosting milk production. Mr. M.V.K.'s foresight revolutionized dairy farming in Karnataka. BAMUL stands today as the leading milk union in the state, thanks to his initiatives. The Hassan Milk Union follows closely, recognized for its substantial milk production. Revered by Karnataka's dairy farming community as the 'Father of the Dairy Revolution,' 'Dairy Brahma of Karnataka,' and 'Pioneer of Dairy Farming in Karnataka,' Mr. M.V.K.'s contributions are indisputably significant. He passed away on August 1, 1980, leaving behind a legacy of dairy farming development in the state.";

  const kurienKannadaText =
    'ರೈತರ ಬಗ್ಗೆ ಅಪಾರ ಕಾಳಜಿ ಹೊಂದಿದ್ದ ಇವರು ಮೂಲತಃ ಕೋಲಾರ ಜಿಲ್ಲೆಯವರು. ಇವರು ಜನಿಸಿದ್ದು ಮುಳಬಾಗಿಲು ತಾಲ್ಲೂಕಿನ ಮೋತಕಪಲ್ಲಿ ಎಂಬ ಕುಗ್ರಾಮದಲ್ಲಿ. ದಿನಾಂಕ 01.06.1918 ಇವರ ಜನ್ಮದಿನ. ಒಂದು ಘಟ್ಟದಲ್ಲಿ ರಾಜಕೀಯ ಪ್ರವೇಶ ಮಾಡಿದ ಇವರು 1952 ರಲ್ಲಿ ಮೊದಲ ಬಾರಿ ಲೋಕಸಭೆಗೆ ಆಯ್ಕೆಯಾಗಿದ್ದರು. ಜವಹರಲಾಲ್ ನೆಹರು ನೇತೃತ್ವದ ಕೇಂದ್ರ ಸರ್ಕಾರ ಎಂ.ವಿ.ಕೆ. ರವರಿಗೆ “ಕೃಷಿ ಹಾಗು ಆಹಾರ ಸಚಿವ”ರಾಗಿ ಸೇವೆ ಸಲ್ಲಿಸುವ ಅವಕಾಶವನ್ನು ಕಲ್ಪಿಸಿ ಕೊಟ್ಟಿತ್ತು. ರಾಜ್ಯದ ಹೈನುಗಾರರು ಹೈನುಗಾರಿಕೆಗಾಗಿ ನಾಡ ತಳಿ ಪಶುಗಳನ್ನು ನೆಚ್ಚಿಕೊಂಡಿದ್ದ ಕಾಲ ಅದಾಗಿತ್ತು. ಇಲ್ಲಿನ ಹೈನುಗಾರಿಕೆ ಹೀಗೆಯೇ ಮುಂದುವರೆದರೆ ನಗರ/ಪಟ್ಟಣಗಳಿಂದ ಹಾಲಿಗೆಂದು ಸೃಷ್ಟಿಯಾಗುವ ಬೇಡಿಕೆಯನ್ನು ನೀಗಿಸುವುದು ಕಷ್ಟ ಎಂಬುದನ್ನು ಶ್ರೀಯುತ ಎಂ.ವಿ.ಕೆ. ರವರು ಆ ದಿನಗಳಲ್ಲೇ ಯೋಚಿಸಿದ್ದರು. ಕೇಂದ್ರ ಮಂತ್ರಿ ಮಂಡಲದಲ್ಲಿ ಸಚಿವರಾಗಿದ್ದಾಗ ಸಾಕಷ್ಟು ವಿದೇಶಗಳನ್ನು ಸುತ್ತಿ ಬಂದಿದ್ದ ಅವರು ಅಲ್ಲಿನ ತಳಿಗಳ ಹಾಲುತ್ಪಾದನಾ ಸಾಮರ್ಥ್ಯವನ್ನು ಕಂಡು ಬೆರಗಾಗಿದ್ದರು. ಮಾತ್ರವಲ್ಲ, ಹಾಲೆಂಡ್ ದೇಶದಿಂದ ಹೆಚ್.ಎಫ್ ತಳಿ ರಾಸುಗಳನ್ನು ಆಮದು ಮಾಡಿಕೊಂಡು ಇಲ್ಲಿನ ರೈತರಿಗೆ ಹಂಚಿಕೆ ಮಾಡಿದ್ದರು. ದೇಶದ ನಾಡ ತಳಿ ರಾಸುಗಳನ್ನು ಕೃತಕಗರ್ಭಧಾರಣೆ ಮೂಲಕ ಅಭಿವೃದ್ಧಿ ಪಡಿಸಬೇಕೆಂಬ ಉದ್ದೇಶದಿಂದ ಕೇಂದ್ರ ಸರ್ಕಾರದಿಂದÀ ನೆರವು ಪಡೆದ ಅವರು 8 ರಿಂದ 10 ವಿದೇಶಿ ತಳಿ ಹೋರಿಗಳನ್ನು ಸಹಿತ ಕರ್ನಾಟಕಕ್ಕೆ ಆಮದು ಮಾಡಿಕೊಳ್ಳುವಲ್ಲಿ ಯಶಸ್ವಿಯಾಗಿದ್ದರು. ರಾಜ್ಯದ ಮೈಸೂರು, ಬೆಂಗಳೂರು, ಮಂಗಳೂರು ಹಾಗು ಮಲೆನಾಡಿನ ಕೆಲವು ಪ್ರದೇಶಗಳಲ್ಲಿ ತಳಿವರ್ಧನೆ ಚಟುವಟಿಕೆ ಮೂಲಕ ಹಾಲುತ್ಪಾದನೆ ಹೆಚ್ಚಳಕ್ಕೆ ಶ್ರಮಿಸಿದ್ದರು. ಪ್ರಾಯಶಃ ಹೈನುಗಾರಿಕೆ ಬಗ್ಗೆ ಶ್ರೀಯುತ ಎಂ.ವಿ.ಕೆ. ರವರು ಹೊಂದಿದ್ದ ದೂರದೃಷ್ಟಿಯ ಪ್ರಭಾವದಿಂದಾಗಿ ಇಂದು ಇಡೀ ರಾಜ್ಯದಲ್ಲಿ ಎಲ್ಲಿಗೇ ಹೋದರೂ ಮಿಶ್ರತಳಿ ರಾಸುಗಳದ್ದೇ ಕಾರುಬಾರು ಎಂಬಂಥ ಪರಿಸ್ಥಿತಿ ಇದೀಗ ನಿರ್ಮಾಣವಾಗಿರುವುದು ಸತ್ಯ. ಒಟ್ಟಾರೆ, ರಾಜ್ಯದ ಹೈನುಗಾರಿಕೆ ಬಗ್ಗೆ ಶ್ರೀಯುತ ಎಂ.ವಿ.ಕೃಷ್ಣಪ್ಪ ರವರು ಹೊಂದಿದ್ದ ಕಾಳಜಿಯಿಂದಾಗಿ ಬಮುಲ್ ಇಂದು ರಾಜ್ಯ ಮಟ್ಟದಲ್ಲಿಯೇ  ಹಾಲು ಶೇಖರಣೆ ಕುರಿತಂತೆ ರಾಜ್ಯ ಮಟ್ಟದಲ್ಲಿ ಮೊದಲ ಸ್ಥಾನದಲ್ಲಿರುವ ಹಾಲು ಒಕ್ಕೂಟವಾಗಿ ಬೆಳೆದು ನಿಂತಿದೆ. ಹಾಲುತ್ಪಾದನೆ ಕುರಿತಂತೆ ನಾಗಾಲೋಟದಲ್ಲಿ ಸಾಗುತ್ತಿರುವ ಹಾಸನ ಹಾಲು ಒಕ್ಕೂಟ ಸಹಿತ ಇಂದು ರಾಜ್ಯ ಮಟ್ಟದಲ್ಲಿ ಎರಡನೇ ಸ್ಥಾನದಲ್ಲಿರುವ ಹಾಲು ಒಕ್ಕೂಟ ಎಂಬ ಕೀರ್ತಿಗೆ ಪಾತ್ರವಾಗಿದೆ. ಹೈನುಗಾರಿಕೆಯಲ್ಲಿ ತೊಡಗಿಸಿಕೊಂಡ ಕರ್ನಾಟಕದ ಮಂದಿ ಇವರನ್ನು “ಕ್ಷೀರಕ್ರಾಂತಿಯ ಪಿತಾಮಹ”, “ಕರ್ನಾಟಕದ ಕ್ಷೀರ ಬ್ರಹ್ಮ”, “ಕರ್ನಾಟಕ ಕಂಡ ಹೈನುಗಾರಿಕೆಯ ಹರಿಕಾರ” ಎಂದೆಲ್ಲಾ ಬಣ್ಣಿಸುತ್ತಿದ್ದಾರೆ. ಇವೆಲ್ಲವೂ ಶ್ರೀಯುತರ ಪಾಲಿಗೆ ಸಂದ ಅರ್ಥಪೂರ್ಣ ಬಿರುದುಗಳು ಎನ್ನುವುದರಲ್ಲಿ ಸಂದೇಹವೇ ಇಲ್ಲ. ರಾಜ್ಯದಲ್ಲಿನ ಹೈನುಗಾರಿಕೆ ಏಳಿಗೆಗಾಗಿ ಗಮನಾರ್ಹ ಕೊಡುಗೆ ನೀಡಿರುವ ಮಾನ್ಯ ಎಂ.ವಿ.ಕೆ.ರವರು ದಿನಾಂಕ 01.08.1980 ರಂದು ಇಹಲೋಕ ತ್ಯಜಿಸಿದರು.  ';
  const founderEnglishText =
    "Verghese Kurien (26 November 1921 – 9 September 2012) was an Indian dairy engineer and social entrepreneur who led initiatives that contributed to the extensive increase in milk production termed the White Revolution.In 1949, Kurien was sent by the Government of India to its run a experimental creamery at Anand where he set up the Kaira District Cooperative Milk Producers' Union Limited in 1950 which later became Amul. Amul organised dairy farmers in the villages as a part of a cooperative and linked them to consumers directly. The dairy cooperative was successful in increasing milk production as consumers paid in cash to dairy farmers who controlled the marketing, procurement, and processing of milk and milk products as the owners of the cooperative.Kurien with then Prime Minister Lal Bahadur Shastri in 1964 Then-Prime Minister Lal Bahadur Shastri visited Anand to inaugurate Amul's cattle feed factory in October 1964 when he also interacted with the farmers about their cooperative. In 1965, Shastri tasked Kurien to replicate the dairy's Anand scheme nationwide, for which the National Dairy Development Board (NDDB) was founded. The board was led by Kurien on conditions that it be independent of governmental control and that it be set up at Anand, away from the capitals and closer to farmers. Kurien negotiated with donors like the UNICEF for aid to develop the cooperatives and opposed countries which lobbied against him stating that he wanted to 'convert aid into trade' contrary to his idea of making India self-sufficient in milk production.  He used the proceeds to encourage the movement of high-yield native cattle to urban areas and set up milk sheds and dairy farms nationwide to stabilize the dairy markets of big cities. The Anand model was replicated across Gujarat and Kurien brought all of them under the Gujarat Co-operative Milk Marketing Federation (GCMMF) in 1973 to sell their products under a single Amul brand on the 25th anniversary of establishment. Other states emulated setting up similar federations based on this scheme. In 1979, he founded the Institute of Rural Management Anand (IRMA) to groom managers for the cooperatives.He was awarded the Ramon Magsaysay Award in 1964 and World Food Prize in 1989. In 1999, he received Padma Vibhushan, India's second highest civilian honour. He was conferred the Order of Agricultural Merit by the French Government in 1997.";

  const founderKannadaText =
    "ವರ್ಗೀಸ್ ಕುರಿಯನ್ (26 ನವೆಂಬರ್ 1921 - 9 ಸೆಪ್ಟೆಂಬರ್ 2012) ಒಬ್ಬ ಭಾರತೀಯ ಡೈರಿ ಎಂಜಿನಿಯರ್ ಮತ್ತು ಸಾಮಾಜಿಕ ಉದ್ಯಮಿಯಾಗಿದ್ದು, ಭಾರತೀಯ ಶ್ವೇತ ಕ್ರಾಂತಿಯ ಪಿತಾಮಹನೆಂದು ಕರೆಯಲ್ಪಡುವ ಕುರಿಯನ್ ರವರು ಭಾರತದಲ್ಲಿ ಅತಿ ಹೆಚ್ಚು ಹಾಲಿನ ಉತ್ಪಾದನೆಯನ್ನು ಹೆಚ್ಚಿಸಲು ಹಲವಾರು ಕ್ರಾಂತಿಕಾರಿ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಂಡರು. 1949 ರಲ್ಲಿ ಭಾರತ ಸರ್ಕಾರವು ಗುಜುರಾತಿನ ಆನಂದನಲ್ಲಿ ಪ್ರಾಯೋಗಿಕವಾಗಿ ಹಾಲು ಡೇರಿಯೊಂದನ್ನು ವರ್ಗೀಸ್ ಕುರಿಯನ್ ರವರ ನೇತೃತ್ವದಲ್ಲಿ ಪ್ರಾರಂಭಿಸಲಾಯಿತು. ಮುಂದುವರೆದು, ಪ್ರಾಯೋಗಿಕ ಹಂತದಲ್ಲಿ ಯಶಸ್ವಿಯಾದ ಹಾಲು ಡೇರಿಯೊಂದನ್ನು ಕುರಿಯನ್ ರವರ ಮಾರ್ಗದರ್ಶನದಂತೆ 1950 ರಲ್ಲಿ ಕೈರಾ ಜಿಲ್ಲಾ ಸಹಕಾರಿ ಹಾಲು ಉತ್ಪಾದಕರ ಒಕ್ಕೂಟ ನಿಯಮಿತವಾಗಿ ಸ್ಥಾಪಿತವಾಯಿತು. ಇದೇ ಮುಂದೆ “ಅಮುಲ್” ಆಗಿ ಮಾರ್ಪಟ್ಟಿತು. ಅಮುಲ್ ಸಹಕಾರಿ ತತ್ವದಡಿಯಲ್ಲಿ ಹಳ್ಳಿಗಳಲ್ಲಿ ಹೈನುಗಾರರು ಮತ್ತು ಗ್ರಾಹಕರ ನಡುವೆ ಸಂಪರ್ಕವನ್ನು ಏರ್ಪಡಿಸಿದೆ. ಹಾಲು ಮತ್ತು ಹಾಲಿನ ಉತ್ಪನ್ನಗಳ ಮಾರುಕಟ್ಟೆ, ಸಂಗ್ರಹಣೆ ಮತ್ತು ಸಂಸ್ಕರಣೆಯನ್ನು ಸಹಕಾರಿ ಸಂಘದ ಮಾಲೀಕರಾಗಿ ನಿಯಂತ್ರಿಸುವ ಹಾಲು ಉತ್ಪಾದಕ ರೈತರಿಗೆ ಗ್ರಾಹಕರು ನಗದು ರೂಪದಲ್ಲಿ ಪಾವತಿಸಿದ್ದರಿಂದ ಡೇರಿ ಸಹಕಾರಿಯು ಹಾಲಿನ ಉತ್ಪಾದನೆಯನ್ನು ಹೆಚ್ಚಿಸುವಲ್ಲಿ ಯಶಸ್ವಿಯಾಗಿದೆ. 1964 ರಲ್ಲಿ ಕುರಿಯನ್ ರವರು ಅಂದಿನ ಪ್ರಧಾನಮಂತ್ರಿಗಳಾದ ಲಾಲ್ ಬಹಾದ್ದೂರ್ ಶಾಸ್ತ್ರಿ ರವರು ಕೈರಾದ ಆನಂದಗೆ ಭೇಟಿ ನೀಡಿ, ಅಮುಲ್ ಪಶು ಆಹಾರ ಘಟಕವನ್ನು ಉದ್ಘಾಟಿಸಿ, ಅಲ್ಲಿನ ಸ್ಥಳೀಯ ಹೈನುಗಾರರೊಂದಿಗೆ ಸಮಾಲೋಚಿಸಿದರು. ಅದರ ಪರಿಣಾಮವಾಗಿ 1965 ರಲ್ಲಿ ಶಾಸ್ತ್ರಿ ರವರು ಕುರಿಯನ್ ರವರ ನೇತೃತ್ವದಲ್ಲಿ ಅಮುಲ್ ಮಾದರಿಯ  ಒಕ್ಕೂಟ ವ್ಯವಸ್ಥೆಯನ್ನು ದೇಶಾದಾದ್ಯಂತ ವಿಸ್ತರಿಸಲು ತೀರ್ಮಾನಿಸಿದರು, ಇದರ ಪ್ರತಿಪಲವೇ National Dairy Development Board (NDDB).  NDDB ಯ ಪ್ರಥಮ  ಅದ್ಯಕ್ಷರಾಗುವಂತೆ ಕೋರಿದಾಗ, ಮಂಡಳಿಯು ಸರ್ಕಾರದ ನಿಯಂತ್ರಣದಿಂದ ಸ್ವತಂತ್ರವಾಗಿರಬೇಕು ಮತ್ತು ರಾಜಧಾನಿಗಳಿಂದ ದೂರವಿರುವ ಮತ್ತು ರೈತರಿಗೆ ಹತ್ತಿರವಾದ ಆನಂದ್‌ನಲ್ಲಿ ಸ್ಥಾಪಿಸಬೇಕು ಎಂಬ ಷರತ್ತುಗಳ ಮೇಲೆ ಕುರಿಯನ್ ನೇತೃತ್ವ ವಹಿಸಿದ್ದರು. ಕುರಿಯನ್ UNICEF ನಂತಹ  ಅಂತರಾಷ್ಟೀಯ ಸಂಸ್ಥೆಗಳಿಂದ  ಸಹಕಾರಿ ಸಂಸ್ಥೆಗಳನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಲು ಸಹಾಯ ಕೋರಿದಾಗ, ಅವರ ವಿರೋಧಿಗಳು  ಹಾಲು ಉತ್ಪಾದನೆಯಲ್ಲಿ ಭಾರತವನ್ನು ಸ್ವಾವಲಂಬಿಯಾಗಿಸುವ ಅವರ ಕಲ್ಪನೆಗೆ ವಿರುದ್ಧವಾಗಿ 'ಸಹಾಯವನ್ನು ವ್ಯಾಪಾರವಾಗಿ ಪರಿವರ್ತಿಸುತ್ತಿದ್ದಾರೆ' ಎಂದು ಅಪಪ್ರಚಾರ ಮಾಡಿದರು. ಹೆಚ್ಚಿನ ಇಳುವರಿ ನೀಡುವ ಸ್ಥಳೀಯ ಜಾನುವಾರುಗಳನ್ನು ನಗರ ಪ್ರದೇಶಗಳಿಗೆ ಸಾಗಿಸಲು ಪ್ರೋತ್ಸಾಹಿಸಲು ಮತ್ತು ದೊಡ್ಡ ನಗರಗಳ ಡೈರಿ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಸ್ಥಿರಗೊಳಿಸಲು ರಾಷ್ಟ್ರವ್ಯಾಪಿ ಹಾಲಿನ ಶೆಡ್‌ಗಳು ಮತ್ತು ಡೇರಿ ಫಾರ್ಮ್‌ಗಳನ್ನು ಸ್ಥಾಪಿಸಲು ಅವರು ಆದಾಯವನ್ನು ಬಳಸಿದರು. ಆನಂದ್ ಮಾದರಿಯನ್ನು ಗುಜರಾತ್‌ನಾದ್ಯಂತ ಯಶಸ್ವಿಯಾಗಿ ಅಳವಡಿಸಿ , ಮುಂದೆ ಕುರಿಯನ್ ರವರು 1973 ರಲ್ಲಿ ಗುಜರಾತ್ ಕೋ-ಆಪರೇಟಿವ್ ಮಿಲ್ಕ್ ಮಾರ್ಕೆಟಿಂಗ್ ಫೆಡರೇಶನ್ (GCMMF) ಅಡಿಯಲ್ಲಿ ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳನ್ನು ಅಮುಲ್ ಬ್ರಾಂಡ್‌ನಲ್ಲಿ ಮಾರಾಟ ಮಾಡಿ ಯಶಸ್ಸನ್ನು ಪಡೆದರು. ಇತರ ರಾಜ್ಯಗಳು ಈ ಯೋಜನೆಯ ಆಧಾರದ ಮೇಲೆ ಇದೇ ರೀತಿಯ ಒಕ್ಕೂಟಗಳನ್ನು ಸ್ಥಾಪಿಸಲು ಅನುಕರಿಸಿದವು. 1979 ರಲ್ಲಿ, ಅವರು ಸಹಕಾರಿ ಸಂಸ್ಥೆಗಳಿಗೆ ವ್ಯವಸ್ಥಾಪಕರನ್ನು ರೂಪಿಸಲು ಇನ್ಸ್ಟಿಟ್ಯೂಟ್ ಆಫ್ ರೂರಲ್ ಮ್ಯಾನೇಜ್ಮೆಂಟ್ ಆನಂದ್ (IRMA) ಅನ್ನು ಸ್ಥಾಪಿಸಿದರು. ವರ್ಗೀಸ್ ಕುರಿಯನ್ ರವರಿಗೆ 1964 ರಲ್ಲಿ ರಾಮನ್ ಮ್ಯಾಗ್ಸೆಸೆ ಪ್ರಶಸ್ತಿ ಮತ್ತು 1989 ರಲ್ಲಿ ವಿಶ್ವ ಆಹಾರ ಪ್ರಶಸ್ತಿಯನ್ನು ನೀಡಲಾಯಿತು. 1999 ರಲ್ಲಿ ಅವರು ಭಾರತದ ಎರಡನೇ ಅತ್ಯುನ್ನತ ನಾಗರಿಕ ಗೌರವವಾದ ಪದ್ಮ ವಿಭೂಷಣವನ್ನು ಪಡೆದರು. ಅವರಿಗೆ 1997 ರಲ್ಲಿ ಫ್ರೆಂಚ್ ಸರ್ಕಾರವು ಆರ್ಡರ್ ಆಫ್ ಅಗ್ರಿಕಲ್ಚರಲ್ ಮೆರಿಟ್ ಅನ್ನು ನೀಡಿತು";

  const kurienText = locale === 'en' ? kurienEnglishText : kurienKannadaText;
  const founderText = locale === 'en' ? founderEnglishText : founderKannadaText;

  const tabs = [
    {
      tabName: locale === 'en' ? 'KMF Sanjeevini' : 'ಕಹಾಮ ಸಂಜೀವಿನಿ',
      link: `/${locale}/women-empowerment?id=9`
    },
    {
      tabName: locale === 'en' ? 'KsheeraBhagya' : 'ಕ್ಷೀರ ಭಾಗ್ಯ',
      link: `/${locale}/portfolio/ksheerabhagaya`
    },
    {
      tabName: locale === 'en' ? 'KsheeraDhare' : 'ಕ್ಷೀರಧಾರೆ',
      link: `/${locale}/portfolio/ksheeradhare`
    },

    {
      tabName: locale === 'en' ? 'Schemes' : 'ಯೋಜನೆಗಳು',
      link: `/${locale}/animal-husbandry/scheme`
    },
    {
      tabName: locale === 'en' ? 'Awards' : 'ಪ್ರಶಸ್ತಿಗಳು',
      link: `/${locale}/portfolio/awards`
    },
    {
      tabName: locale === 'en' ? 'Sex Sorted Semen' : 'ಲಿಂಗ ನಿರ್ಧಾರಿತ ವೀರ್ಯನಳಿಕೆ',
      link: `/${locale}/animal-husbandry/animal-breeding`
    },
    {
      tabName: locale === 'en' ? 'Marketing' : 'ಕಹಾಮ ಮಾರುಕಟ್ಟೆ',
      link: `/${locale}/portfolio/marketing`
    }
  ];
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/kmf-achievements');
      const { data: sponsor } = await axios.get('/api/sponsoreds');
      const { data: banner } = await axios.get('/api/banners?sort[0]=createdAt:desc');
      // const { data: pdf } = await axios.get('/api/Ksheerasagramagazines');

      setBanners(banner.data);
      setSponsore(sponsor.data);
      setAchievments(data.data);
      // setPdf(pdf.data);
      
    })();
  }, []);

  const handleTabs = (idx) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    setAchievments(achievementItems);

    const handleSlideView = () => {
      const screen = window.innerWidth;
      if (screen < 1113) {
        setSlideView(2);
      }
      if (screen < 779) {
        setSlideView(1);
      }
    };
    handleSlideView();

    window.addEventListener('resize', handleSlideView);
    return () => window.removeEventListener('resize', handleSlideView);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isChangeIcon, setIsChangeIcon] = useState(false);


  const changeIcon = () => {
    setIsChangeIcon(!isOpen);
  };
  const changeIcon2 = () => {
    setIsChangeIcon(isOpen);
  }; 

  const colours = [
    "blue-500", "green-500", "red-500", "yellow-500", "orange-500", "purple-500", "pink-500",
    "brown-500", "red-950", "amber-500", "lime-500", "teal-500", "cyan-500"
  ];
 
  const [colorIndex, setColorIndex] = useState(0);
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
  }

const toggleNavbar = () => {
  let randomNumber;
  do {
    randomNumber = getRandomInt(0, colours.length - 1);
 
  } while (randomNumber === colorIndex); // Ensure the new color is different from the current one
  setColorIndex(randomNumber);
  setIsOpen(!isOpen);
};

useEffect(()=>{
    setInterval(() => {
        setColorIndex(getRandomInt(0,colours.length-1))
    }, 2000);
},[])

const randColor = colours[colorIndex];


const [pdfWidth, setPdfWidth] = useState(null);

useEffect(()=>{
const handleResize=()=>{
 if(window.innerWidth === 786){
  setPdfWidth(1)
  // console.log("pdfw",pdfWidth)
  
 }
 else{
  setPdfWidth(3)
  // console.log("pdfw",pdfWidth)

 }
}

window.addEventListener('resize',handleResize);

},[])  


  return (
    <div className={`w-full h-full absolute transition-all duration-700  z-[-1]  scroll-smooth  text-c `}>
     <div className='w-full h-[30vh] md:h-[100vh] relative z-[100]'>
      <div className="w-full  h-full relative bg-slate-50 z-[-10]  overflow-x-hidden">
        <div className=" absolute z-50 w-10 h-10 md:w-12 md:h-12 top-6 right-6 md:top-8 md:right-40">
          <div className='w-full h-full flex justify-center items-center'>
          <p
            id="openMenu"
            onMouseEnter={changeIcon}
            onMouseLeave={changeIcon2}
            onClick={toggleNavbar}
            className={`text-white hidden md:block relative z-[100] transition-all duration-1000  ${
              isOpen ? 'hidden' : ''
            }`}>
            {isChangeIcon ? <HiArrowSmallLeft size={40} /> : <IoMenu size={40} />}
          </p>
          <p
            id="openMenu"
            onMouseEnter={changeIcon}
            onMouseLeave={changeIcon2}
            onClick={toggleNavbar}
            className={`text-white md:hidden relative z-[100] transition-all duration-1000  ${
              isOpen ? 'hidden' : ''
            }`}>
            {isChangeIcon ? <HiArrowSmallLeft size={35} /> : <IoMenu size={35} />}
          </p>
          </div>
         
        </div>
        <div className='absolute z-[40] bg-black rounded-full w-10 h-10 md:w-12 md:h-12 top-6 right-6 md:top-8 md:right-40 opacity-45'>

          </div>
        <div className={`left-[50%] absolute  bottom-[3%] ${isOpen ? 'hidden' : ' hidden md:block'} `}>
          <a href="#history-milk">
            {' '}
            <div className="mouseAnime"></div>
          </a>
        </div>
        <div
          id="imageDiv"
          className={`transition-all duration-700 scroll-smooth ${
            isOpen
              ? 'absolute w-full z-[-1] p-0 md:p-3 left-0 md:left-[-38%] h-[100%] md:h-[80%] top-0 md:top-[10%] overflow-hidden'
              : 'absolute w-full h-full z-[-1]'
          }`}>
          <div className=" relative w-full h-full">
            <section className={`w-full h-full relative`}>
              <Swiper
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false
                }}
                direction={'vertical'}
                pagination={{
                  clickable: true
                }}
                modules={[Pagination, Autoplay, FreeMode]}
                className="h-full">
                {/* {banners?.map((item, id) => {
                  return ( */}
                    <SwiperSlide >
                      <img loading="lazy" decoding="async"
                        src={home1.src}
                        alt=""
                        className="w-full h-full"
                      />
                    </SwiperSlide>
                     <SwiperSlide >
                      <img loading="lazy" decoding="async"
                        src={home2.src}
                        alt=""
                        className="w-full h-full"
                      />
                    </SwiperSlide>
                     <SwiperSlide >
                      <img loading="lazy" decoding="async"
                        src={home3.src}
                        alt=""
                        className="w-full h-full"
                      />
                    </SwiperSlide>
                     <SwiperSlide >
                      <img loading="lazy" decoding="async"
                        src={home4.src}
                        alt=""
                        className="w-full h-full"
                      />
                    </SwiperSlide>
                     <SwiperSlide >
                      <img loading="lazy" decoding="async"
                        src={home5.src}
                        alt=""
                        className="w-full h-full"
                      />
                    </SwiperSlide>
                     <SwiperSlide >
                      <img loading="lazy" decoding="async"
                        src={home6.src}
                        alt=""
                        className="w-full h-full"
                      />
                    </SwiperSlide>
                     <SwiperSlide >
                      <img loading="lazy" decoding="async"
                        src={home7.src}
                        alt=""
                        className="w-full h-full"
                      />
                    </SwiperSlide>
                     <SwiperSlide >
                      <img loading="lazy" decoding="async"
                        src={home9.src}
                        alt=""
                        className="w-full h-full"
                      />
                    </SwiperSlide>
                     <SwiperSlide >
                      <img loading="lazy" decoding="async"
                        src={home10.src}
                        alt=""
                        className="w-full h-full"
                      />
                    </SwiperSlide>
                     <SwiperSlide >
                      <img loading="lazy" decoding="async"
                        src={home11.src}
                        alt=""
                        className="w-full h-full"
                      />
                    </SwiperSlide>
                   
                  {/* );
                })} */}
              </Swiper>
            </section>
          </div>
        </div>
      
      </div>
      <div
          className={`transition-all duration-1000 scroll-smooth fixed w-[75%] md:w-[38%] top-0 h-[100vh]  z-[1000] shadow-xl bg-white ${
            isOpen ? '  right-0' : ' right-[-1000px]'
          }`}>
          <div
            className={` bg-zinc-800 rounded-full p-3 absolute top-[50%] left-[-33px] md:left-[-40px] z-[100000] shadow-2xl  ${
              isOpen ? '' : 'hidden'
            }`}>
            <p
              id="openMenu"
              onClick={toggleNavbar}
              className="text-3xl text-white transition-all duration-1000"
              onMouseEnter={changeIcon}
              onMouseLeave={changeIcon2}>
              {isChangeIcon ? <GrClose size={30} /> : <HiArrowSmRight size={30} />}
            </p>
          </div>

          <div className="w-full h-full flex flex-col md:justify-around items-center">
            <div className="pt-6 md:pt-[70px]  h-[5%] md:h-[10%]">
              <h1 className="text-primary-main text-xl md:text-5xl text-center">
                {' '}
                {locale === 'en' ? 'PORTFOLIO' : 'ಪೋರ್ಟ್ಫೋಲಿಯೋ'}
              </h1>
            </div>
            <div className="w-full h-[50%] md:h-[65%] flex flex-col justify-between items-start gap-2 md:gap-3 pl-6 md:pl-12 mt-10 md:mt-8 ">
              <div>
                {' '}
                <Link href={`/${locale}/portfolio/historyofmilk`}>
                  <h1 className={`text-${randColor}  text-lg md:text-2xl`}>
                    {' '}
                    {locale === 'en' ? 'HISTORY OF MILK' : 'ಹಾಲಿನ ಇತಿಹಾಸ'}
                  </h1>
                </Link>
                <div className="flex flex-wrap gap-1 md:gap-3 text-[10px] md:text-base ">
                <Link href={`/${locale}/portfolio/historyofmilk`}>
                    {' '}
                    <p >{locale === 'en' ? 'HISTORY OF MILK' : 'ಹಾಲಿನ ಇತಿಹಾಸ'}</p>
                  </Link>
                  <p>|</p>
                  <a href="#krisna">
                    {' '}
                    <p>{locale === 'en' ? 'DR. VERGHESE KURIEN' : 'ಡಾ. ವರ್ಗೀಸ್ ಕುರಿಯನ್'} </p>
                  </a>
                  <p>|</p>
                  <a href="#verghese">
                    {' '}
                    <p>{locale === 'en' ? 'MR. MV KRISHNAPPA' : 'ಶ್ರೀ. ಎಂ.ವಿ. ಕೃಷ್ಣಪ್ಪ'}</p>
                  </a>
                  
                 
                </div>
              </div>
              <div>
                {' '}
                <a href="#ACHIEVEMENTS">
                  {' '}
                  <h1 className={`text-${randColor}   text-lg md:text-2xl`}>
                    {' '}
                    {locale === 'en' ? 'KMF ACHIEVEMENTS' : 'ಕಹಾಮ ಸಾಧನೆಗಳು'}
                  </h1>
                </a>
                <div className="flex flex-wrap gap-3 text-[10px] md:text-base uppercase ">
                  {tabs?.map((item, id) => {
                    return (
                      <>
                        <p>
                          <Link href={item.link}>{item?.tabName}</Link>
                        </p>
                        {id < tabs.length - 1 && <p>|</p>}
                      </>
                    );
                  })}
                </div>
              </div>
              <div>
                {' '}
                <Link href={`/${locale}/portfolio/brandambassador`}>
                  {' '}
                  <h1 className={`text-${randColor}  text-lg md:text-2xl`}>
                    {' '}
                    {locale === 'en' ? ' BRAND AMBASSADOR' : ' ಕಹಾಮ ರಾಯಭಾರಿಗಳು'}
                  </h1>
                </Link>
                <div className="flex flex-wrap gap-5 pt-3 text-[10px] md:text-base uppercase">
                  <Link href={`/${locale}/portfolio/brandambassador`}>
                    {' '}
                    <p>{locale === 'en' ? 'Know More' : 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ'}</p>
                  </Link>
                  <p>|</p>
                  <Link href={`/${locale}/blog/gallery`}>
                    {' '}
                    <p>{locale === 'en' ? 'GALLERY' : 'ಗ್ಯಾಲರಿ'}</p>
                  </Link>
                </div>
              </div>
              <div>
                {' '}
                <a href="#ksheerasagaramagazine">
                  {' '}

                  {randColor &&
                   <h1 className={`text-${randColor}  text-lg md:text-2xl`}>
                   {locale === 'en' ? 'KSHEERASAGARA MAGAZINE' : 'ಕ್ಷೀರಸಾಗರ ಮಾಸಪತ್ರಿಕೆ'}
                 </h1>
                  }
                 
                </a>
              </div>
              <div>
                <a href="#SPONSORED">
                  <h1 className={`text-${randColor}  text-lg md:text-2xl`}>
                    {locale === 'en' ? 'SPONSORED' : 'ಪ್ರಾಯೋಜಕತ್ವ'}
                  </h1>
                </a>{' '}
              </div>
            </div>
            <div className="flex flex-col justify-center h-[40%] md:h-[35%] w-full p-3 md:pl-10">
              <div className="flex flex-col justify-center md:justify-start  items-center  space-x-3 w-full">
                <div className="  flex flex-col  justify-start md:justify-center items-start space-y-2  w-full  ">
                  <div className="w-full flex   space-x-5" >
                    <div className="flex justify-center items-center      ">
                      <div className="">
                        <img loading="lazy" decoding="async"
                          src={locationIco.src}
                          className="w-10 h-7 hover:scale-125 transition-all duration-300"
                        />
                      </div>

                      <p
                        className={` font-heading flex flex-col font-black/10 ${
                          locale === 'kn' ? 'text-[15px]' : 'text-[12px]'
                        }  `}>
                        {headerItem?.attributes?.address?.map((item, id) => {
                          return (
                            <span key={id} className="block">
                              {item?.children[0]?.text}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                 
                   
                  </div>

                  <div className="flex justify-center md:justify-start items-center w-full   ">
                    <div>
                      <img loading="lazy" decoding="async"
                        src={contactIco.src}
                        className="w-10 h-7 hover:scale-125 transition-all duration-300"
                      />
                    </div>
                    <p className="text-[12px] w-[350px] font-heading  font-black/10 ">
                      {headerItem?.attributes?.time?.map((item, id) => {
                        return (
                          <span key={id} className="block ">
                            {item?.children[0]?.text}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                  <div className="flex space-x-5 justify-center p-2  items-center">
                      <Link
                        href={'https://www.facebook.com/kmfnandini.coop'}
                        className="hover:scale-125 transition-all duration-300">
                        <img loading="lazy" decoding="async" src={facebookIco.src} className="w-7" />
                      </Link>
                      <Link
                        href={'https://twitter.com/kmfnandinimilk'}
                        className="hover:scale-125 transition-all duration-300">
                        <img loading="lazy" decoding="async" src={twitterIco.src} className="w-7" />
                      </Link>
                      <Link
                        href={`/${locale}/contact`}
                        className="hover:scale-125 transition-all duration-300">
                        {' '}
                        <img loading="lazy" decoding="async" src={mailIco.src} className="w-7" />
                      </Link>
                      <Link
                        href={
                          'https://www.instagram.com/kmfnandini.coop?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
                        }
                        className="hover:scale-125 transition-all duration-300">
                        {' '}
                        <img loading="lazy" decoding="async" src={insta.src} className="w-7" />
                      </Link>
                      <Link
                        href={'https://www.youtube.com/@kmfnandini12'}
                        className="hover:scale-125 transition-all duration-300">
                        {' '}
                        <img loading="lazy" decoding="async" src={ytIco.src} className="w-7" />
                      </Link>
                    </div>
                </div>

                <div className="flex flex-col justify-between md:justify-start space-y-3 ">
                  <button
                    className="bg-primary-main w-[100px] h-[36px]  text-neutral-light4 text-xs font-semibold rounded-md "
                    onClick={handleLanguageChange}>
                    {locale === 'en' ? 'ಕನ್ನಡ' : 'English'}
                  </button>
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </div>

      {/* <section className={`w-full  h-[700px] relative  `}>
      <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false
      }}
        direction={'vertical'}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination,Autoplay,FreeMode]}
        className="h-full"
      >

        {banners?.map((item,id)=>{
         
          return(
            <SwiperSlide key={id}>
          
            <img loading="lazy" decoding="async" src={item?.attributes?.banner?.data?.attributes?.url} alt="" className='w-full h-[700px]' />
         
            </SwiperSlide>
          )
         
        })}
      


      </Swiper>

    
      </section> */}

      <section id="history-milk" className="w-full h-auto mt-10">
        <div className=" w-full flex flex-col items-center justify-center lg:mt-20 p-3">
          <Fade bottom>
          <h1 className="text-primary-main text-2xl md:text-5xl " style={{ fontFamily: 'cursive' }}>
            {' '}
            <i> {locale === 'en' ? 'HISTORY OF MILK' : 'ಹಾಲಿನ ಇತಿಹಾಸ'} </i>
          </h1>
          </Fade>
          <div className="mt-0 md:mt-4 text-center mr-auto ml-auto flex flex-col justify-center items-center">
            <Fade left>
            <p className="text-3xl md:text-5xl font-bold">
              {locale === 'en' ? 'LETS BEGIN THE' : 'ಹಾಲು - ಹುಟ್ಟು, ವಿಕಾಸ, ಬೆಳವಣಿಗೆಯ ಹಾದಿ'}
              <br />
              {locale === 'en' ? 'JOURNEY OF MILK' : ''}
            </p>

            </Fade>

            <Fade right>
            <p className="text-lg md:text-2xl  mt-6 md:mt-16 max-w-[850px] text-center">
              {locale === 'en'
                ? 'The history of milk is a fascinating journey that intertwines with the evolution of human civilization and the domestication of animals. As early humans transitioned from a nomadic lifestyle to settled agricultural communities, the realization that certain animals could provide a steady supply of milk marked a pivotal moment.'
                : 'ಹಾಲಿನ ಪ್ರಾಚೀನತೆಯು ಹಾಗೂ ಇತಿಹಾಸವು ಮಾನವನ ವಿಕಾಸ , ನಾಗರಿಕತೆ ಮತ್ತು ಪ್ರಾಣಿಗಳನ್ನು ಪಳಗಿಸಿ  ಸಾಕಾಣಿಕೆಯೊಂದಿಗೆ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ. ಆದಿ ಮಾನವರು ಅಲೆಮಾರಿ ಜೀವನಶೈಲಿಯಿಂದ ಸ್ಥಿರ ನೆಲೆಸಿದ ಕೃಷಿ ಸಮುದಾಯಗಳಿಗೆ ಪರಿವರ್ತನೆಯಾದಾಗ, ಕೆಲವು ಪ್ರಾಣಿಗಳು ಹಾಲಿನ ಸ್ಥಿರ ಪೂರೈಕೆಯನ್ನು ಒದಗಿಸಬಹುದು ಎಂಬ ಅರಿವು ಪ್ರಮುಖವಾದುದು.'}
            </p>
            </Fade>

            <Link href={`/${locale}/portfolio/historyofmilk`}>
              {' '}

              <Fade bottom> 
              <button className="mt-5 w-full flex justify-center text-primary-main">
                {locale === 'en' ? 'Read More..' : 'ಮುಂದುವರೆದಿದೆ....'}{' '}
              </button>
              </Fade>
            </Link>
          </div>
        </div>
      </section>

      <section id="krisna" className="w-full h-auto mt-10 md:mt-20 ">
        <div className="w-full h-full">
          <div className="relative max-w-7xl  h-full bg-[#f99457] m-auto flex flex-col lg:flex-row justify-center pt-7 pb-7">
            <Fade left>
            <div className="w-full lg:w-[50%]  lg:p-10 h-full flex justify-center items-center">
              <img loading="lazy" decoding="async" className="w-[70%] lg:w-full" src={founderOfMilk2Img.src} alt="" />
            </div>

            </Fade>


            <div className="w-full lg:w-[50%] h-full flex flex-col justify-center text-justify items-center p-3 lg:p-10">
              <Fade right>
              <h1 className="text-white text-lg md:text-4xl font-bold text-center ">
                {locale === 'en'
                  ? 'KSHEERA PITHAMAHA - DR. VERGHESE KURIEN'
                  : ' ಕ್ಷೀರ ಪಿತಾಮಹ - ಡಾ. ವರ್ಗೀಸ್ ಕುರಿಯನ್'}
              </h1>
              </Fade>

              <Fade right>
              <p className="text-sm md:text-lg  lg:mt-10 text-white text-justify">
                {' '}
                {showFullText ? (
                  founderText
                ) : (
                  <>
                    {founderText.substring(0, 1000)}
                    <br />
                    {founderText.length > 100 && (
                      <button className=" w-full text-center" onClick={toggleTextVisibility}>
                        {locale === 'en' ? 'Read More..' : 'ಮತ್ತಷ್ಟು ಓದಿ....'}{' '}
                      </button>
                    )}
                  </>
                )}
                <br />
                {showFullText && (
                  <button className="w-full text-center" onClick={toggleTextVisibility}>
                    {locale === 'en' ? 'Read Less' : 'ಕಡಿಮೆ ಓದಿ....'}
                  </button>
                )}
              </p>
              </Fade>
            </div>
          </div>
        </div>
      </section>
      <section id="verghese" className="w-full h-auto mt-5">
        <div className="w-full h-full">
          <div className="relative max-w-7xl  h-full bg-[#4f7ffc] m-auto flex flex-col lg:flex-row justify-center pt-7 pb-7 ">
            <div className="order-last lg:order-1 w-full lg:w-[50%] h-full flex flex-col justify-center text-justify items-center p-3 lg:p-10">
              <Fade bottom>
              <h1 className="text-white text-lg md:text-4xl font-bold text-center ">
                {locale === 'en'
                  ? 'KARNATAKA KSHEERA BRAHMA - MR. MV KRISHNAPPA'
                  : 'ಕರ್ನಾಟಕ ಕ್ಷೀರ ಬ್ರಹ್ಮ - ಶ್ರೀ. ಎಂ.ವಿ. ಕೃಷ್ಣಪ್ಪ'}
              </h1>
              </Fade>

              <Fade left>
              <p className="text-sm md:text-lg  lg:mt-10 text-white text-justify">
                {' '}
                {showFullText ? (
                  kurienText
                ) : (
                  <>
                    {kurienText.substring(0, 1000)}
                    <br />
                    {kurienText.length > 100 && (
                      <button className=" w-full text-center" onClick={toggleTextVisibility}>
                        {' '}
                        {locale === 'en' ? 'Read More..' : 'ಮುಂದುವರೆದಿದೆ....'}{' '}
                      </button>
                    )}
                  </>
                )}
                <br />
                {showFullText && (
                  <button className="w-full text-center" onClick={toggleTextVisibility}>
                    {' '}
                    {locale === 'en' ? 'Read Less' : 'ಕಡಿಮೆ ಓದಿ....'}
                  </button>
                )}
              </p>
              </Fade>
            </div>
            <div className="order-1 lg:order-last w-full lg:w-[50%] lg:p-10 h-full flex justify-center items-center">
              <Fade right>
              <img loading="lazy" decoding="async" className="w-[70%] lg:w-full" src={KRISHNAPPA.src} alt="" />
              </Fade>
            </div>
          </div>
        </div>
      </section>

      <section id="history" className="w-full h-auto">
        <div className=" h-[410px]  md:h-[480px] flex flex-col lg:flex-row items-center mt-10 md:mt-20">
          <Swiper
            slidesPerView={slideView}
            freeMode={true}
            centeredSlides={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            modules={[FreeMode, Autoplay]}
            className="w-full h-full">


              <Zoom>
              
            <SwiperSlide className="" style={{ width: 100 }}>

              <div className="relative  w-[100%]  h-full bg-[#f99457] group ">
                <div className="absolute w-full h-full top-0 left-0 z-20">
                  <img loading="lazy" decoding="async"
                    className="w-full h-full opacity-0 transition duration-0 group-hover:opacity-30 group-hover:duration-1000 "
                    src={milkImg.src}
                    alt=""
                  />
                </div>
                <div className="full h-full flex flex-col justify-between p-6 md:p-16 ">
                  <div className="w-full h-full z-50">
                    <h1 className="text-white text-3xl md:text-5xl text-center">
                      {' '}
                      {locale === 'en' ? 'HISTORY OF ' : 'ಹಾಲಿನ '} <br />
                      {locale === 'en' ? ' MILK' : ' ಇತಿಹಾಸ'}
                    </h1>
                    <p className="mt-6 md:mt-12 md:text-2xl text-2xl text-white">
                      {locale === 'en'
                        ? 'The history of milk is a fascinating journey that intertwines with the evolution of.. '
                        : 'ಹಾಲಿನ ಪ್ರಾಚೀನತೆಯು ಹಾಗೂ ಇತಿಹಾಸವು ಮಾನವನ ವಿಕಾಸ , ನಾಗರಿಕತೆ ಮತ್ತು '}
                    </p>
                  </div>

                  <div className="w-40 h-14 border-[1px] border-white z-50 ">
                    <Link href={`/${locale}/portfolio/historyofmilk`}>
                      {' '}
                      <div className="w-full h-full flex justify-center items-center border-l-[3px] border-l-white hover:border-[3px]">
                        <p className="text-lg text-white">
                          {locale === 'en' ? 'Know More' : 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ'}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            </Zoom>


<Zoom>
            <SwiperSlide className="">
              <div className="relative  w-[100%]  h-full bg-[#4f7ffc] group">
                <div className="absolute w-full h-full top-0 left-0 z-20">
                  <Swiper
                    slidesPerView={1}
                    freeMode={true}
                    centeredSlides={false}
                    autoplay={{
                      delay: 1000,
                      disableOnInteraction: false
                    }}
                    modules={[FreeMode, Autoplay]}
                    className="w-full h-full">
                    <SwiperSlide>
                      <img loading="lazy" decoding="async"
                        className="w-full h-full opacity-0 transition duration-0 group-hover:opacity-30 group-hover:duration-1000 "
                        src={band1.src}
                        alt=""
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img loading="lazy" decoding="async"
                        className="w-full h-full opacity-0 transition duration-0 group-hover:opacity-30 group-hover:duration-1000 "
                        src={band2.src}
                        alt=""
                      />
                    </SwiperSlide>

                    <SwiperSlide>
                      <img loading="lazy" decoding="async"
                        className="w-full h-full object-fill opacity-0 transition duration-0 group-hover:opacity-30 group-hover:duration-1000 "
                        src={band4.src}
                        alt=""
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="full h-full flex flex-col justify-between p-6 md:p-16 ">
                  <div className="w-full h-full z-50">
                    <h1 className="text-white text-3xl md:text-5xl text-center">
                      {' '}
                      {locale === 'en' ? ' BRAND' : ' ಕಹಾಮ'} <br />
                      {locale === 'en' ? ' AMBASSADOR' : ' ರಾಯಭಾರಿಗಳು'}
                    </h1>
                    <p className="mt-6 md:mt-12 text-2xl md:text-2xl text-white">
                      {locale === 'en'
                        ? 'Karnataka Milk Federation appoints ambassadors from renowned Kannada artistes  '
                        : 'ಕರ್ನಾಟಕ ಹಾಲು ಮಹಾಮಂಡಳವು ತನ್ನ ಉತ್ಪನ್ನಗಳ ಮಾರುಕಟ್ಟೆ ವ್ಯಾಪ್ತಿಯನ್ನು '}
                    </p>
                  </div>

                  <div className="w-40 h-14 border-[1px] border-white z-50 ">
                    <Link href={`/${locale}/portfolio/brandambassador`}>
                      {' '}
                      <div className="w-full h-full flex justify-center items-center border-l-[3px] border-l-white hover:border-[3px]">
                        <p className="text-lg text-white">
                          {locale === 'en' ? 'Know More' : 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ'}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            </Zoom>


            <Zoom>
            <SwiperSlide className="">
              <div className="relative  w-[100%]  h-full bg-[#f99457] group">
                <div className="absolute w-full h-full top-0 left-0 z-20">
                  <img loading="lazy" decoding="async"
                    className="w-full h-full opacity-0 transition duration-0 group-hover:opacity-30 group-hover:duration-1000 "
                    src={achivement.src}
                    alt=""
                  />
                </div>
                <div className="full h-full flex flex-col justify-between p-6 md:p-16 ">
                  <div className="w-full h-full z-50">
                    <h1 className="text-white text-3xl md:text-5xl text-center ">
                      {' '}
                      {locale === 'en' ? 'KMF ' : 'ಕಹಾಮ '} <br />
                      {locale === 'en' ? ' ACHIEVEMENTS' : ' ಸಾಧನೆಗಳು'}
                    </h1>
                    <p className="mt-6 md:mt-12 text-2xl md:text-2xl text-white">
                      {locale === 'en'
                        ? ' KMF- Nandini Brand, a proud household name of Karnataka with its slogan of..'
                        : ' ‘‘ಗೋವಿನಿಂದ ಗ್ರಾಹಕರಿಗೆ ಗುಣಮಟ್ಟದ ಉತ್ಕೃಷ್ಟತೆ” ಎಂಬ ಪರಿಕಲ್ಪನೆಯಡಿಯಲ್ಲಿ ಕರ್ನಾಟಕದ'}
                    </p>
                  </div>

                  <div className="w-40 h-14 border-[1px] border-white z-50 ">
                    <a href="#ACHIEVEMENTS">
                      {' '}
                      <div className="w-full h-full flex justify-center items-center border-l-[3px] border-l-white hover:border-[3px]">
                        <p className="text-lg text-white">
                          {' '}
                          {locale === 'en' ? 'Know More' : 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ'}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            </Zoom>


            <Zoom>
            <SwiperSlide className="">
              <div className="relative  w-[100%]  h-full bg-[#4f7ffc]  group">
                <div className="absolute w-full h-full top-0 left-0 z-20">
                  <Swiper
                    slidesPerView={1}
                    freeMode={true}
                    centeredSlides={false}
                    autoplay={{
                      delay: 1000,
                      disableOnInteraction: false
                    }}
                    modules={[FreeMode, Autoplay]}
                    className="w-full h-full">
                    <SwiperSlide>
                      <img loading="lazy" decoding="async"
                        className="w-full h-full opacity-0 transition duration-0 group-hover:opacity-30 group-hover:duration-1000 "
                        src={spon2.src}
                        alt=""
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img loading="lazy" decoding="async"
                        className="w-full h-full opacity-0 transition duration-0 group-hover:opacity-30 group-hover:duration-1000 "
                        src={spon3.src}
                        alt=""
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="w-full h-full flex flex-col justify-center md:justify-between p-6 md:p-16 ">
                  <div className="w-full h-full z-50">
                    <h1 className="text-white text-3xl md:text-5xl text-center ">
                      {' '}
                      {locale === 'en' ? 'SPONSORED' : 'ಪ್ರಾಯೋಜಕತ್ವ'}
                    </h1>
                    <p className="mt-16 md:mt-24 text-2xl text-white">
                    {locale === 'en' ? '"Nandini" is enhancing its brand image through sponsorship Expanding sales network..' : 'ಪ್ರಾಯೋಜಕತ್ವದ ಮೂಲಕ “ನಂದಿನಿ” ತನ್ನ ಬ್ರಾಂಡ್ ಇಮೇಜ್ ಹೆಚ್ಚಿಸಿಕೊಂಡು. ಮಾರಾಟಜಾಲ.. '}
                    
                    </p>
                  </div>

                  <div className="w-40 h-14 border-[1px] border-white z-50 ">
                    <a href="#SPONSORED">
                      {' '}
                      <div className="w-full h-full flex justify-center items-center border-l-[3px] border-l-white hover:border-[3px]">
                        <p className="text-lg text-white">
                          {locale === 'en' ? 'Know More' : 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ'}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            </Zoom>
          </Swiper>
        </div>
      </section>

    <section id="ACHIEVEMENTS" className="w-full h-auto mt-10 md:mt-20">
        <div className="w-full text-center">
          <div className="w-full pt-10  md:pt-20 md:pb-20">
              <Fade bottom>
            <div className="mt-1 w-full relative flex justify-center items-center">
              <h1 className="w-full  m-auto text-center  text-primary-main text-2xl md:text-5xl font-bold ">
                {locale === 'en' ? 'KMF ACHIEVEMENTS' : 'ಕಹಾಮ ಸಾಧನೆಗಳು'}
              </h1>
              <img loading="lazy" decoding="async" className="absolute top-[-52px] left-[40%] md:left-[55%] w-40 " src={titleBG.src} alt="" />
            </div>
              </Fade>
          </div>
          {/* <h1 className="text-primary-main text-2xl md:text-6xl "> KMF ACHIEVEMENTS </h1> */}
          <div className="w-full flex  md:flex-row flex-wrap justify-center items-center mt-10  gap-1 md:gap-5">
            {tabs?.map((tab, id) => {
              return (
                <div key={id} onClick={() => handleTabs(id)} className="flex gap-1 md:gap-3">
                  <Link href={tab.link}>
                    {' '}

                    <Fade top>
                    <p
                      className={`${
                        currentIndex === id
                          ? 'hover:text-orange-300 transition-all duration-200 hover:scale-[1.2]'
                          : 'text-black hover:text-orange-300 transition-all duration-200 hover:scale-[1.2]'
                      } text-[12px] md:text-lg`}>
                      {' '}
                      {tab.tabName}
                    </p>
                    </Fade>
                  </Link>
                  {id < tabs.length - 1 && <p className="text-[12px] md:text-2xl font-bold">/</p>}
                </div>
              );
            })}
          </div>

          {/* <div className="w-full h-auto mt-0 mb-20">
            {tabs?.map((tab, id) => {
              if (currentIndex === id) {
                return tab.data;
              }
            })}
          </div> */}

          <div className="w-full h-auto">
            {/* <div className=" relative w-full">
              <h1 className="text-primary-main text-2xl md:text-4xl "> KMF ACHIEVEMENTS </h1>
              <img loading="lazy" decoding="async"
                className="absolute top-[-35px] md:top-[-50px] left-[49%] md:left-[51%] w-32 md:w-40 "
                src={titleBG.src}
                alt=""
              />
            </div> */}

            <div className="  lg:block lg:max-w-none lg:shadow-none lg:p-0   p-6 md:p-16  relative max-w-xl m-auto w-full     rounded-3xl  shadow-2xl     max-h-[500px] h-full z-[-1]">
              <img loading="lazy" decoding="async" className="w-full h-full hidden  lg:block " src={flag.src} alt="" />
              <div className=" lg:absolute top-[60px] lg:top-0 xl:top-[60px] w-full h-full">
                <div className="w-full h-full flex justify-center items-center">
                  <div className="max-w-xl lg:max-w-lg xl:max-w-3xl w-full m-auto">
                    <Fade left >
                    <h1 className="uppercase text-primary-main lg:mt-10 text-2xl md:text-4xl font-bold ">
                      {' '}
                      {locale === 'en' ? 'KMF ACHIEVEMENTS' : 'ಕಹಾಮ ಸಾಧನೆಗಳು'}{' '}
                    </h1>
                    </Fade>

                    <Fade right>
                    <div className="mt-6">
                      {achievments?.filter(
                        (item) =>
                          item?.attributes?.title === 'KMF Achievements' ||
                          item?.attributes?.title === 'ಕಹಾಮ ಸಾಧನೆಗಳು'
                      )[0]?.attributes?.content && (
                        <BlocksRenderer
                          content={
                            achievments?.filter(
                              (item) =>
                                item?.attributes?.title === 'KMF Achievements' ||
                                item?.attributes?.title === 'ಕಹಾಮ ಸಾಧನೆಗಳು'
                            )[0]?.attributes?.content
                          }
                          blocks={{
                            paragraph: ({ children }) => {
                              return  <p className="text-lg md:text-xl ">{children}</p>;
                            },
                            list: ({ children }) => {
                              return children;
                            }
                          }}
                        />
                      )}
                    </div>
                    </Fade>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-auto flex flex-wrap justify-center">
              {achievments?.map((item, id) => {
             
                if (
                  item?.attributes?.title !== 'KMF Achievements' &&
                  item?.attributes?.title !== 'ಕಹಾಮ ಸಾಧನೆಗಳು'
                ) {
                  return (
                    <div
                      key={id}
                      className=" max-w-xl w-full m-3 md:m-10 rounded-3xl  shadow-2xl h-auto bg-slate-50 p-6 md:p-16">
                      <div className="m-auto">
                        <div className="w-[300px] md:w-[450px] relative">
                          <img loading="lazy" decoding="async"
                            src="/images/heading/heading-color/group.png"
                            className="absolute z-[1] w-fit top-[-25px] md:top-[-48px]   object-contain"
                          />

                          <h1 className="w-full relative max-w-[250px] md:max-w-[300px] m-auto  text-primary-main text-sm md:text-xl  font-bold z-[100] ">
                            {' '}
                            {item?.attributes?.title}
                          </h1>
                        </div>
                        <div className=" mt-20">
                          <ul className="list-disc text-left">
                            {item?.attributes?.content && (
                              <BlocksRenderer
                                content={
                                  readMore
                                    ? item?.attributes?.content
                                    : item?.attributes?.content.slice(0, 1)
                                }
                                blocks={{
                                  paragraph: ({ children }) => {
                                    return <li>{children}</li>;
                                  },
                                  list: ({ children }) => {
                                    return children;
                                  }
                                }}
                              />
                            )}

                            <button
                              onClick={toggleReadMore}
                              className="w-full flex justify-end text-primary-main">
                              {readMore
                                ? locale === 'en'
                                  ? 'Read Less'
                                  : 'ಕಡಿಮೆ ಓದಿ....'
                                : locale === 'en'
                                  ? 'Read More'
                                  : 'ಮತ್ತಷ್ಟು ಓದಿ....'}
                            </button>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </section>

      {/* <section id="ksheerasagaramagazine" className="w-full h-auto mt-10 mb-10  ">
        <div className=" m-auto  ">
          <div  className=" mt-20 mb-5 w-full  flex  justify-center items-center">
            <Fade top>
            <h1 className="relative  m-auto text-center  text-primary-main text-2xl md:text-5xl font-bold  ">
              {locale === 'en' ? 'KSHEERASAGARA MAGAZINE' : 'ಕ್ಷೀರಸಾಗರ ಮಾಸಪತ್ರಿಕೆ'} 
              <span><img loading="lazy" decoding="async" className="absolute top-[-55px] right-[20px]  w-40 " src={titleBG.src} alt="" /></span>
            </h1>
            </Fade>

          </div>

          <div className="w-full p-5 lg:p-16">
            <div  className="md:hidden w-full flex flex-col md:flex-row gap-6">
              <Swiper
                slidesPerView={1}
                freeMode={true}
                centeredSlides={false}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false
                }}
                modules={[FreeMode, Autoplay]}
                className="w-[350px] lg:w-full h-[530px]">
              
                  <SwiperSlide >
                  <PdfPreview id='ksheerasagara' className="" pdfUrl="https://gleeful-moonbeam-95e429.netlify.app/Ksheera_March_2024_4438048407.pdf"/>
                </SwiperSlide>
                
                
              </Swiper>
            </div>
            <div  className="hidden md:flex flex-col md:flex-row gap-6">
              <Swiper
                slidesPerView={3}
                freeMode={true}
                centeredSlides={false}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false
                }}
                modules={[FreeMode, Autoplay]}
                className="w-full h-[530px]">
               {pdf?.map((item,id)=>{
             
                return(
                  <>
                  <SwiperSlide key={id}>
                  <PdfPreview id='ksheerasagara' className="" pdfUrl={pdf1}  count={id+1}/>
                </SwiperSlide>
                </>
                )
               })}   
                
              </Swiper>
            </div>
          </div>
        </div>
      </section> */}

      <section id="SPONSORED" className="w-full h-auto  md:pt-10  md:pb-20  ">
        <div className="w-full text-center">
          <div className="w-full pt-10 md:pt-20  md:pb-20">
            <div className="relative mt-1 w-full  flex justify-center items-center">
              <h1 className="w-full  m-auto text-center  text-primary-main text-2xl md:text-5xl font-bold  ">
                {locale === 'en' ? 'SPONSORED' : 'ಪ್ರಾಯೋಜಕತ್ವ'}
              </h1>
              <img loading="lazy" decoding="async" className="absolute top-[-52px] left-[35%] md:left-[50%] w-40 " src={titleBG.src} alt="" />
            </div>
          </div>
          {/* <h1 className="text-primary-main text-2xl md:text-6xl "> SPONSORED </h1> */}
          <div className="w-full flex justify-center items-center flex-wrap mt-10">
            <Swiper
              // slidesPerView={slideView}
              freeMode={true}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              watchSlidesProgress={true}
              slidesPerView={3}
              spaceBetween={20}
             
              modules={[FreeMode, Autoplay]}
              className="max-w-7xl m-auto ">
              {/* {sponsore[0]?.attributes?.image?.data?.map((item, idx) => {
                return ( */}
                  <SwiperSlide  className="">
                    <div className="flex justify-center items-center  w-52 h-52 ">
                      <img loading="lazy" decoding="async" className="m-auto w-44 h-44" src={spon1.src} alt="" />
                    </div>
                  </SwiperSlide>
                    <SwiperSlide  className="">
                    <div className="flex justify-center items-center  w-52 h-52 ">
                      <img loading="lazy" decoding="async" className="m-auto w-44 h-44" src={spon2.src} alt="" />
                    </div>
                  </SwiperSlide>
                    <SwiperSlide  className="">
                    <div className="flex justify-center items-center  w-52 h-52 ">
                      <img loading="lazy" decoding="async" className="m-auto w-44 h-44" src={spon3.src} alt="" />
                    </div>
                  </SwiperSlide>
                    <SwiperSlide  className="">
                    <div className="flex justify-center items-center  w-52 h-52 ">
                      <img loading="lazy" decoding="async" className="m-auto w-44 h-44" src={spon4.src} alt="" />
                    </div>
                  </SwiperSlide>
                    <SwiperSlide  className="">
                    <div className="flex justify-center items-center  w-52 h-52 ">
                      <img loading="lazy" decoding="async" className="m-auto w-44 h-44" src={spon5.src} alt="" />
                    </div>
                  </SwiperSlide>
                    <SwiperSlide  className="">
                    <div className="flex justify-center items-center  w-52 h-52 ">
                      <img loading="lazy" decoding="async" className="m-auto w-44 h-44" src={spon6.src} alt="" />
                    </div>
                  </SwiperSlide>
                    <SwiperSlide  className="">
                    <div className="flex justify-center items-center  w-52 h-52 ">
                      <img loading="lazy" decoding="async" className="m-auto w-44 h-44" src={spon7.src} alt="" />
                    </div>
                  </SwiperSlide>
                    <SwiperSlide  className="">
                    <div className="flex justify-center items-center  w-52 h-52 ">
                      <img loading="lazy" decoding="async" className="m-auto w-44 h-44" src={spon8.src} alt="" />
                    </div>
                  </SwiperSlide>
                    <SwiperSlide  className="">
                    <div className="flex justify-center items-center  w-52 h-52 ">
                      <img loading="lazy" decoding="async" className="m-auto w-44 h-44" src={spon9.src} alt="" />
                    </div>
                  </SwiperSlide>
                   <SwiperSlide  className="">
                    <div className="flex justify-center items-center  w-52 h-52 ">
                      <img loading="lazy" decoding="async" className="m-auto w-44 h-44" src={spon10.src} alt="" />
                    </div>
                  </SwiperSlide>
                {/* );
              })} */}
            </Swiper>
            {/* <Swiper
              watchSlidesProgress={true}
              slidesPerView={3}
              spaceBetween={20}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              modules={[FreeMode, Autoplay]}
              className="max-w-7xl m-auto">
              {sponsore[0]?.attributes?.image?.data?.map((item, idx) => {
                return (
                  <SwiperSlide key={idx} className=" text-center">
                  <div className="flex justify-center items-center md:ml-[27%]  w-52 h-52 ">
                    <img loading="lazy" decoding="async" className="m-auto w-44 h-44" src={item?.attributes?.url} alt="" />
                  </div>
                </SwiperSlide>
                );
              })}
            </Swiper> */}
          </div>
        </div>
      </section>

       
<Footer />
    </div>
  );
}

export default Portfolio;