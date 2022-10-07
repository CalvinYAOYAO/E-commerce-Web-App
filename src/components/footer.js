
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css'; // import 'rc-footer/asssets/index.less';
import './footer.css'

const SampleFooter = () => ( 
  
  <Footer  className='footer'
  onClick
  autoFocus
  columns={[
    {
      title: 'Contact Us',
      items: [
        {
          title: 'Address: 1254 Johnson Street, Columbus, OH 43210',
        },
        {
          title: 'Email: support@pineapple.com',
        },
        {
          title: 'Phone: +1 (614)-128-9812',
        },
      ],
    },
    {
      title: 'Follow us',
      items: [
        {
          icon: (
            <img
              src="https://cdn-icons-png.flaticon.com/512/1409/1409946.png"
              alt=""
            />
          ),
          title: 'Instagram',
          url: 'https://www.instagram.com/',
          openExternal: true,
        },
        {
          icon: (
              <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt=""
                  width="50"
              />
          ),
          title: 'Facebook',
          url: 'https://www.facebook.com/',
          openExternal: true,
        },
        {
          icon: (
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
              alt=""
            />
          ),
          title: 'Twitter',
          url: 'https://twitter.com',
          openExternal: true,
        },
      ],
    },
  ]}
/>

);


export default () => <SampleFooter />;