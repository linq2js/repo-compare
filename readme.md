**Table of Contents**

- [Prerequisites and Installation](#prerequisites-and-installation)
- [Project file structure](#project-file-structure)
  - [Conventions](#conventions)
- [Project pakcages](#project-pakcages)
- [Project customization](#project-customization)
  - [Theming](#theming)
  - [Localization](#localization)
    - [Conventions](#conventions-1)
  - [Navigation](#navigation)
    - [Defininf navigator](#defininf-navigator)
    - [Conventions](#conventions-2)
- [Rativ user guide](#rativ-user-guide)

# Prerequisites and Installation

Put installation instruction here

# Project file structure

**Profile files**

```bash
__tests__ # put unit test/integration test files here
# put all documentations for whole project here
docs/
assets/
feats/
    # where to put all project runtime configs
    configs/
        theme.ts
    main/
        docs/ # contains documentations of the feature
        # feature logic
        atoms/
        signals/
        effects/
        sagas/
        # UI stuff
        comps/
            MyComponent.tsx
            # if the component has complex UI and logic, break it down to separated directory
            MyComplexComponent/
                # these child components must be referenced by the things inside MyComponent/ only
                comps/
                    ChildComponent1.tsx
                    ChildComponent2.tsx
                hooks/
                helpers/
                atoms/
                signals/
                effects/
                sagas/
                types/
                # export the component and its child components here
                index.tsx
        modals/
        screens/
        navigation/
        # utils
        hooks/
        helpers/
        types/
        # native
        native/
            ui/
            methods/
    shared/
App.tsx
.env
.env.production
```

## Conventions

- The screen component name must have `Screen` postfix (ex: `HomeScreen`)
- The modal component name must have `Modal` postfix (ex: `LoginModal`)
- Normal folder name must be snake_case (ex: `feats/quick_start`)
- Component file/folder name muse be CamelCase (ex: `HomeScreen`, `UserProfile`)
- Class/Type/Model name must be CamelCase (ex: `User`, `UserProfileModel`)
- Util/helper/service file name muse be pascalCase (ex: `createModal.tsx`)
- The component's skeleton must be in the same file as the component
- Must use createScreen() to create a screen

# Project pakcages

- native-base https://docs.nativebase.io/
- rativ https://linq2js.github.io/rativ/
- axios
- rn-fetch-blob https://github.com/joltup/rn-fetch-blob
- date-fns
- i18next
- lodash
- react-i18next
- react-hook-form
- react-native-safe-area-context
- react-native-svg
- react-native-vector-icons
- react-navigation

# Project customization

## Theming

Please refer this link to see how to customize theming https://docs.nativebase.io/default-theme

Color palatte generator https://palx.jxnblk.com/
Color swatch generator https://smart-swatch.netlify.app/

## Localization

All locale files are located in /feats/trans/locales

### Conventions

- Use two letters iso code for the locale file name (`en.ts`, `vi.ts`, etc.)
- Locale file must follow the structure below:

  ```ts
  export default {
    featureName: {
      MyComponent: {
        heading: '',
        description: '',
      },
      common: {
        ok: '',
        cancel: '',
      },
    },
  };
  ```

- Must create translator hook for each feature. The code below shows how to create translator hook and use the hook with component

  ```tsx
  // user/hooks/translator.ts
  import { defaultLocale } from '@/trans';
  import { createTranslator } from '@/trans/helpers/createTranslator';

  const [useUserText, UserText] = createTranslator(defaultLocale, 'featureName');

  export { useUserText, UserText };

  // myFeatureName/comps/MyComponent
  // using translatedSlot function
  const Example1 = stable(() => {
    return (
      <>
        <Box>
          {
            // create Text component from translated text MyComponent.heading
            UserText('MyComponent.heading')
          }
        </Box>
        {
          // passing custom render function, the render function receives translator(key)
          UserText('MyComponent', (T) => (
            <>
              <Text>{T('heading')}</Text>
              <Text>{T('description')}</Text>
            </>
          ))
        }
      </>
    );
  });

  const Example2 = stable(() => {
    return () => {
      const T = useUserText('MyComponent');

      return (
        <>
          <Text>{T('heading')}</Text>
          <Text>{T('description')}</Text>
        </>
      );
    };
  });
  ```

## Navigation

### Defininf navigator

### Conventions

- DO NOT use useNavigation() hook
  - If you want to navigate to other screen, use XXXNavigator (XXX is name of the feature) object
  - If you want to go back, use goBack method in `@shared/helpers/navigator`
  - The XXXScreen component must handle route.params to render needed child components. The route params MUST NOT BE USED anywhere. Using route params in the normal component is very confusing, we can not reuse that component elsewhere
- Screen name must snake_case (ex: `user_profile`, `user_settings`, `device_settings`)

# Rativ user guide

- [Documentation](https://linq2js.github.io/rativ/)
- [Atom](./docs/atom.md)
- [Slot](./docs/slot.md)
- [Stable](./docs/stable.md)
- [Signal](./docs/signal.md)
- [Saga](./docs/saga.md)
