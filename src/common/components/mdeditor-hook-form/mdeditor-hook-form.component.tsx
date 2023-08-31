import { ComponentProps, FC } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Control, Controller } from 'react-hook-form';

interface MDEditorHookFormProps extends ComponentProps<typeof MDEditor> {
  name: string;
  control : Control<any>;
}

export const MDEditorHookForm: FC<MDEditorHookFormProps> = ({
  name, 
  control,
  ...props
}) => {
  return (
    <Controller 
      name={name}
      control={control}
      render={({field: { value, onChange } }) => (
        <MDEditor {...props} value={value} onChange={onChange} />
      )} 
    />
  );
}