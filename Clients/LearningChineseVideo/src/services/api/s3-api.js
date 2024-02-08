
import { uploadFile } from 'react-s3';

const config = {
    bucketName: 'socialv2',
    dirName: 'learingChineseVideo',
    region: 'ap-southeast-2',
    accessKeyId: 'AKIAS7E3LO5H6NJRLCGV',
    secretAccessKey: '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',
}

export const upload = async (file) => {
    return await uploadFile(file, config)
        .catch(err => console.error(err))
}
