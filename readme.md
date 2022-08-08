**Table of Contents**

- [Prerequisites and Installation](#prerequisites-and-installation)
- [Project file structure](#project-file-structure)
  - [Rules](#rules)
- [Project pakcages](#project-pakcages)
- [Project customization](#project-customization)
  - [Theming](#theming)
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
                navigation/
                # export the component and its child components here
                index.tsx
        modals/
        screens/
        hooks/
        helpers/
        navigation/
        types/
    shared/
App.tsx
.env
.env.production
```

## Rules

- The component's skeleton must be in the same file as the component

# Project pakcages

# Project customization

## Theming

Please refer this link to see how to customize theming https://docs.nativebase.io/default-theme

Color palatte generator https://palx.jxnblk.com/
Color swatch generator https://smart-swatch.netlify.app/

# Rativ user guide

- [Atom](./docs/atom.md)
- [Slot](./docs/slot.md)
- [Stable](./docs/stable.md)
- [Signal](./docs/signal.md)
- [Saga](./docs/saga.md)
