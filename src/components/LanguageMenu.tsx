import { Menu, Pressable, Text } from 'native-base';

import { LanguageType } from '../stores/languageStore';

type Props = {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
};

export default function LanguageMenu({ language, setLanguage }: Props) {
  return (
    <Menu
      closeOnSelect
      w='190'
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps}>
            <Text>Language</Text>
          </Pressable>
        );
      }}>
      <Menu.OptionGroup
        defaultValue={language}
        title='Language'
        onChange={(itemValue) => setLanguage(itemValue)}
        type='radio'>
        <Menu.ItemOption value='Indonesia'>Indonesia</Menu.ItemOption>
        <Menu.ItemOption value='English'>English</Menu.ItemOption>
      </Menu.OptionGroup>
    </Menu>
  );
}
