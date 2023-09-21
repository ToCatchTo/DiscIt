import { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';

type Props = {

}

export const ZigZag: FC<Props> = (props) => {
    const { } = props;

    return(
        <Box sx={{display: 'flex', flexDirection: 'column', padding: generalVariables.contentPadding, margin: '100px 0', rowGap: '100px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', rowGap: '15px', width: '49.8%', justifyContent: 'center'}}>
                    <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>
                        O HŘE
                    </Typography>
                    <Typography sx={{ fontSize: '22px' }}>
                    Lorem ipsum dolor sit amet, consectetuer adip iscing elit. 
                    Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit. 
                    Nullam Lorem ipsum dolor sit amet, consectetuer.
                    </Typography>
                </Box>
                <Box sx={{ width: '41.5%', borderRadius: '5px', overflow: 'hidden' }}>
                    <Box component='img' src="/media/targets-header.png" sx={{width: '100%', height: '100%', objectFit: 'cover'}}>
                    </Box>
                </Box>
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{ width: '41.5%', borderRadius: '5px', overflow: 'hidden' }}>
                    <Box component='img' src="/media/targets-header.png" sx={{width: '100%', height: '100%', objectFit: 'cover'}}>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', rowGap: '15px', width: '49.8%', justifyContent: 'center'}}>
                    <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>
                        HŘIŠTĚ
                    </Typography>
                    <Typography sx={{ fontSize: '22px' }}>
                    Lorem ipsum dolor sit amet, consectetuer adip iscing elit. 
                    Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit. 
                    Nullam Lorem ipsum dolor sit amet, consectetuer.
                    </Typography>
                </Box>
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', rowGap: '15px', width: '49.8%', justifyContent: 'center'}}>
                    <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>
                        ZÁZNAMY
                    </Typography>
                    <Typography sx={{ fontSize: '22px' }}>
                    Lorem ipsum dolor sit amet, consectetuer adip iscing elit. 
                    Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit. 
                    Nullam Lorem ipsum dolor sit amet, consectetuer.
                    </Typography>
                </Box>
                <Box sx={{ width: '41.5%', borderRadius: '5px', overflow: 'hidden' }}>
                    <Box component='img' src="/media/targets-header.png" sx={{width: '100%', height: '100%', objectFit: 'cover'}}>
                    </Box>
                </Box>
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{ width: '41.5%', borderRadius: '5px', overflow: 'hidden' }}>
                    <Box component='img' src="/media/targets-header.png" sx={{width: '100%', height: '100%', objectFit: 'cover'}}>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', rowGap: '15px', width: '49.8%', justifyContent: 'center'}}>
                    <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>
                        PŘÁTELÉ
                    </Typography>
                    <Typography sx={{ fontSize: '22px' }}>
                    Lorem ipsum dolor sit amet, consectetuer adip iscing elit. 
                    Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit. 
                    Nullam Lorem ipsum dolor sit amet, consectetuer.
                    </Typography>
                </Box>
            </Box>
        </Box>    
    );
};