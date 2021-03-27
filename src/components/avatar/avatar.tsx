import {UserIcon} from '@components/icons';
import {S3_BUCKET_URL} from 'src/constants';

type AvatarProps = {
  src: string;
};

export const Avatar: React.FC<AvatarProps> = ({src}) => {
  //  NOTE: facebook's picture property returns a JSON of format:
  /*
  * {
   "data":{
      "height":50,
      "is_silhouette":true,
      "url":"https://scontent-cdg2-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=12b3be&_nc_ohc=gzQVa5-RtlIAX9kWe85&_nc_ht=scontent-cdg2-1.xx&tp=27&oh=588fb33755f8cc314bd085dfe88c0379&oe=606E8638",
      "width":50
   }
}
  */

  let faceBookPictureUrl: string;
  try {
    faceBookPictureUrl = (JSON.parse(src) as {data: {url: string}}).data.url;
  } catch (err: unknown) {
    faceBookPictureUrl = '';
  }

  if (faceBookPictureUrl.length > 0) {
    return (
      <img
        className="inline-block rounded-full h-11 w-11"
        src={faceBookPictureUrl}
        alt="avatar"
      />
    );
  }

  const isGoogleProviderPicture = src.includes('https://');

  if (isGoogleProviderPicture) {
    return (
      <img
        className="inline-block rounded-full h-11 w-11"
        src={src}
        alt="avatar"
      />
    );
  }

  if (src.length > 0) {
    return (
      <img
        className="inline-block rounded-full h-11 w-11"
        src={`${S3_BUCKET_URL}/${src}`}
        alt="avatar"
      />
    );
  }

  return (
    <UserIcon className="inline-block text-gray-500 rounded-full h-11 w-11" />
  );
};
