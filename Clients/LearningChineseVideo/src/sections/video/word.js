import { Box, Button, Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { getVocabulary } from "src/services/api/vocabulary";
import _ from "lodash";

const Word = ({
    word, onClick, detail, onClose
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [vocabulary, setVocabulary] = useState();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        onClick();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const separateExampleAsLine = (example) => {
        var chinese = _.map(example.split('。'))[0];
        var rest = _.map(example.split('。'))[1];
        var examples = [chinese, ..._.map(rest.split('. '))];
        return examples;
    }

    useEffect(() => {
        getVocabulary('%E6%88%91')
            .then((res) => {

                setVocabulary(res);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div onClick={onClick}>
                    <Typography
                        {...bindTrigger(popupState)}
                        sx={{
                            color: '#06AED4',
                            height: '40px',
                            fontWeight: '600',
                            fontSize: "25px",
                            '&:hover': {
                                backgroundColor: 'rgb(6, 174, 212, 0.2)',
                                color: '#06AED4',
                                paddingX: '7px',
                                borderRadius: '10px'
                            },
                            "&.Mui-active": {
                                backgroundColor: 'rgb(6, 174, 212, 0.2)',
                                color: '#06AED4',
                                paddingX: '7px',
                                borderRadius: '10px'
                            },
                        }}
                        variant="text">
                        {word}
                    </Typography>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}>
                        <Box sx={{ width: '300px', p: 2 }}>
                            <Typography
                                fontWeight="600"
                                fontSize="20px">{word}</Typography>
                            {vocabulary &&
                                <div>
                                    <p style={{ marginTop: 0 }}>{`[`}{vocabulary.pinyin}{`]`}</p>
                                    <p style={{ fontSize: '14px' }}>Từ loại: {vocabulary.wordType}</p>
                                    <p style={{ fontSize: '14px' }}>Nghĩa: {vocabulary.vietnameseMean}</p>
                                    <p style={{ fontSize: '14px' }}>Ví dụ:</p>
                                    <div style={{ marginLeft: '20px' }}>
                                        {vocabulary.example &&
                                            _.map(separateExampleAsLine(vocabulary.example), (item => (
                                                <p style={{ fontSize: '14px' }}>{item}</p>
                                            )))
                                        }
                                    </div>

                                </div>
                            }
                        </Box>

                    </Popover>
                </div>
            )}
        </PopupState>
    )
}

export default Word;