import { Box, Button, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { getVocabulary } from "src/services/api/vocabulary";
import _ from "lodash";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { saveVoca } from "src/services/api/saved-voca-api";

const Word = ({
    word, onClick, videoId, showedAt
}) => {
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState(null);
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
        var examples = [chinese]
        if (rest) {
            examples = [chinese, ..._.map(rest.split('. '))];
        }

        return examples;
    }

    const fetchWord = (word) => {
        getVocabulary(word)
            .then((res) => {
                console.log("Result of : " + word);
                console.log(res);
                setVocabulary(res);
            })
            .catch(err => {
                setVocabulary(null);
                console.log(err);
                setError(err);
            });
    }

    const saveWord = () => {
        if (!vocabulary)
            return;

        setSaved(!saved);
        console.log();


        if (saved) {

            console.log("Remove saved list");
            return;
        }

        console.log("Saving voca");

        saveVoca({ videoId, word, showedAt })
            .then(() => {
                console.log("Saved voca");
            })
            .catch((err) => { console.log(err) })
    }


    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div onClick={() => {
                    console.log(word);
                    fetchWord(word);
                    onClick();
                }}>
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
                            <Stack
                                justifyContent="space-between"
                                direction="row">
                                <Typography
                                    fontWeight="600"
                                    fontSize="20px">
                                    {word}
                                </Typography>
                                {vocabulary &&
                                    <Button
                                        sx={{
                                            backgroundColor: 'whitesmoke',
                                            paddingX: '10px',
                                            paddingY: '5px',
                                            minWidth: '20px'
                                        }}
                                        onClick={saveWord}
                                        variant="text">
                                        {(saved ? <BookmarkIcon /> : <BookmarkBorderIcon />)}
                                    </Button>
                                }
                            </Stack>
                            {(vocabulary) &&
                                <div>
                                    <p style={{ marginTop: 0 }}>{`[`}{vocabulary.pinyin}{`]`}</p>
                                    <p style={{ fontSize: '14px' }}>Từ loại: {vocabulary.wordType}</p>
                                    <p style={{ fontSize: '14px' }}>Nghĩa: {vocabulary.vietnameseMean}</p>
                                    <p style={{ fontSize: '14px' }}>Ví dụ:</p>
                                    <div style={{ marginLeft: '20px' }}>
                                        {Boolean(vocabulary.example) &&
                                            _.map(separateExampleAsLine(vocabulary.example), (item => (
                                                <p style={{ fontSize: '14px' }}>{item}</p>
                                            )))
                                        }
                                    </div>

                                </div>
                            }
                            {error && <div>Không tìm thấy tự vựng</div>}
                        </Box>

                    </Popover>
                </div>
            )}
        </PopupState>
    )
}

export default Word;