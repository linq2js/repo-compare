**Table of Contents**

- [Prerequisites and Installation](#prerequisites-and-installation)
- [Project file structure](#project-file-structure)
  - [Rules](#rules)
- [Project pakcages](#project-pakcages)
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
        hooks/
        helpers/
        types/
    shared/
App.tsx
.env
.env.production
```

## Rules

- The component's skeleton must be in the same file as the component

# Project pakcages

# Rativ user guide

- [Atom](./docs/atom.md)
- [Slot](./docs/slot.md)
- [Stable](./docs/stable.md)
- [Signal](./docs/signal.md)
- [Saga](./docs/saga.md)
