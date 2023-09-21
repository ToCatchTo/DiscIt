import { customColors } from '@/styles/themes/mainThemeOptions';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';

type Props = {
    picturePath: string,
}

export const Banner: FC<Props> = (props) => {
    const { picturePath } = props;

    return(
        <Box sx={{width: '100%', height: '100vh'}}>
            <Box component='img' sx={{ width: '100%', height: '100%', zIndex: -1, position: 'absolute', left: 0}} alt='Banner obrázek' src={picturePath}>
                
            </Box>
            <Box sx={{ pt: '35vh', display: 'flex', rowGap: '15px', pl: '140px', flexDirection: 'column'}}>
                <Typography sx={{color: customColors.white, fontSize: '42px', fontWeight: 'bold'}}>
                    Váš partner pro hru
                </Typography>
                <Box sx={{ height: '2px', width: '750px', backgroundColor: customColors.white }}>

                </Box>
                <Typography sx={{color: customColors.white, fontSize: '26px', fontWeight: 400, maxWidth: '750px'}}>
                Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit 
                amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.
                </Typography>
            </Box>
        </Box>    
    );
};