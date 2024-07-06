import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    // images:{
    //     remotePatterns: [{
    //         protocol:"https",
    //         port:"",
    //         pathname:"/a/**",
    //         hostname: 'lh3.googleusercontent.com',
    //     }]
    // }
};
 
export default withNextIntl(nextConfig);