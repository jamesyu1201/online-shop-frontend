import React, {
  Fragment, useState, RefObject, useEffect,
} from 'react';
import { withTheme } from 'styled-components';
import { styled, Themable } from '../themes';
import { Input } from '../Input';
import { FormControl } from '../shared';
import { Icon, IconName } from '../Icon';
import { ImagePreview } from '../ImagePreview';

interface Props extends FormControl, Themable {}

const InputContainer = styled.div`
  display: flex;
  width: 100%;
`;

const IconContainer = styled.div`
  padding: ${props => props.theme.padding.sm}px;
  display: flex;
  align-items: center;
`;

export const ImageUploader = withTheme(
  (props: Props): JSX.Element => {
    const {
      onChange, value, errorMessage, theme,
    } = props;

    const imageRef: RefObject<HTMLInputElement> = React.createRef();

    const [image, setImage] = useState(value);
    const [imageName, setImageName] = useState();

    useEffect(() => {
      setImage(value);
    }, [value]);

    const onFilePicked = (e: any) => {
      const { files } = e.target;
      const file = files[0];
      if (file !== undefined) {
        const imgName = file.name;
        if (imgName.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener('load', () => {
          const imageNameInner = file.name;
          setImageName(imageNameInner);
          if (onChange) {
            const imageBuffer = fr.result as ArrayBuffer;
            // onChange(imageBuffer);
            onChange(file);
          }
        });
      }
    };

    return (
      <Fragment>
        <ImagePreview imagePath={image} />
        <InputContainer
          onClick={() => {
            if (!image && onChange) {
              onChange('');
            }
            (imageRef.current as any).click();
          }}
        >
          <IconContainer>
            <Icon name={IconName.faPaperclip} color={theme.imageUploader.iconColor} />
          </IconContainer>
          <Input title="Select image" value={imageName || image} errorMessage={errorMessage} />
        </InputContainer>
        <input
          style={{ display: 'none' }}
          type="file"
          ref={imageRef}
          accept="image/*"
          onChange={onFilePicked}
        />
      </Fragment>
    );
  },
);
