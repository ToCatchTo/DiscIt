import { customColors } from '@/styles/themes/mainThemeOptions';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';
import { BreadcrumbsNavigation } from './HeaderGroup/Header__Breadcrumbs';

type Props = {
    level: number;
    href: Array<string>;
    pageName: Array<string>;
    picturePath: string;
    title: string;
    perex: string;
    imgBg: boolean;
  };

export const Banner: FC<Props> = (props) => {
    const { picturePath, href, pageName, title, perex, imgBg } = props;

    return(
        imgBg ? 
        <Box sx={{width: '100%', height: '100vh', overflow: 'hidden', position: 'relative'}}>
            <Box sx={{ zIndex: 0, mt: '100px', ml: '140px', position: 'absolute' }}>
                <BreadcrumbsNavigation pageName={pageName} href={href} />
            </Box>
            <Box component='img' sx={{width: '100%', height: 'auto', zIndex: -1, position: 'absolute', left: 0, top: -200}} alt='Banner obrázek' src={picturePath}>
            </Box>
            <Box sx={{ pt: '35vh', display: 'flex', rowGap: '15px', pl: '140px', flexDirection: 'column'}}>
                <Typography sx={{color: customColors.white, fontSize: '42px', fontWeight: 'bold'}}>
                    {title}
                </Typography>
                <Box sx={{ height: '2px', width: '750px', backgroundColor: customColors.white }}>
                </Box>
                <Typography sx={{color: customColors.white, fontSize: '26px', fontWeight: 400, maxWidth: '750px'}}>
                {perex}
                </Typography>
            </Box>
        </Box>    
            :
        <Box>
            <Box sx={{ zIndex: 0, mt: '100px', ml: '140px', position: 'absolute' }}>
                <BreadcrumbsNavigation pageName={pageName} href={href} black={true}/>
            </Box>
            <Box sx={{ pt: '18vh', display: 'flex', rowGap: '15px', pl: '140px', flexDirection: 'column', pr: '140px'}}>
                <Typography sx={{color: customColors.black, fontSize: '42px', fontWeight: 'bold'}}>
                    {title}
                </Typography>
                <Box sx={{ height: '2px', width: '100%', backgroundColor: customColors.black }}>
                </Box>
            </Box>
        </Box>
    );
};