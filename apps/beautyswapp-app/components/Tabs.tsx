import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'

export interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <YStack flex={1} gap="$4">
      {/* Tabs Header */}
      <XStack
        backgroundColor="$primary"
        borderRadius={25}
        padding="$2"
        gap="$2"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <YStack
              key={tab.id}
              flex={1}
              py="$3"
              px="$2"
              borderRadius={25}
              backgroundColor={isActive ? '$secondary' : 'transparent'}
              textAlign="center"
              onPress={() => setActiveTab(tab.id)}
              cursor="pointer"
              hoverStyle={{
                opacity: 0.8,
              }}
              pressStyle={{
                opacity: 0.6,
              }}
            >
              <Text
                fontSize="$3"
                fontWeight={isActive ? '700' : '500'}
                color={isActive ? '$backgroundHover' : '$purpleText'}
              >
                {tab.label}
              </Text>
            </YStack>
          )
        })}
      </XStack>

      {/* Tab Content */}
      <YStack flex={1}>
        {activeTabContent}
      </YStack>
    </YStack>
  )
}
