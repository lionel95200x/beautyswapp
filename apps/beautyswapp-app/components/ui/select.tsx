import { YStack, Heading, Select } from 'tamagui';
import { Adapt } from '@tamagui/adapt';
import { Sheet } from '@tamagui/sheet';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

interface SelectItem {
  value: string;
  label: string;
}

interface SelectFieldProps {
  title: string;
  items: SelectItem[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}

export function SelectField({ title, items, value, onValueChange, placeholder }: SelectFieldProps) {
  return (
    <YStack gap="$2">
      <Heading size="$4" color="$purpleText">
        {title}
      </Heading>

      <Select
        value={value}
        onValueChange={onValueChange}
        disablePreventBodyScroll
      >
        <Select.Trigger
          iconAfter={ChevronDown}
          borderColor="$purpleText"
          borderWidth={1}
          bg="transparent"
        >
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>

        <Adapt when="maxMd" platform="touch">
          <Sheet modal dismissOnSnapToBottom>
            <Sheet.Frame>
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton>
            <ChevronUp size={20} />
          </Select.ScrollUpButton>

          <Select.Viewport>
            <Select.Group>
              {items.map((item, index) => (
                <Select.Item
                  key={item.value}
                  index={index}
                  value={item.value}
                >
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator marginLeft="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton>
            <ChevronDown size={20} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    </YStack>
  );
}
